import math
import re
from functools import lru_cache


MODEL_NAME = "bert-base-multilingual-cased"
DISCLOSURE = (
    "Untrained prototype — not a fact-checker. The two-class classification "
    "head is randomly initialized. Activations do not indicate whether news "
    "is real or fake, its credibility, or confidence in a prediction."
)


def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Zअ-हক-হ\s]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def validate_text(text):
    if not isinstance(text, str) or len(text.strip()) < 15:
        raise ValueError("Enter a full headline or paragraph of at least 15 characters.")
    if len(text) > 5000:
        raise ValueError("Limit your input to 5,000 characters.")
    cleaned = clean_text(text)
    if len(cleaned) < 15:
        raise ValueError("Enter readable English, Hindi, or Bengali text.")
    return cleaned


@lru_cache(maxsize=1)
def load_model():
    import torch
    from transformers import AutoModelForSequenceClassification, AutoTokenizer

    torch.manual_seed(0)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_NAME, num_labels=2, use_safetensors=True
    )
    model.eval()
    return tokenizer, model


def score_text(cleaned):
    import torch

    tokenizer, model = load_model()
    inputs = tokenizer(
        cleaned, return_tensors="pt", truncation=True, padding=True, max_length=256
    )
    with torch.inference_mode():
        logits = model(**inputs).logits
        return torch.softmax(logits, dim=1)[0].tolist()


def analyze_news(text, scorer=score_text):
    try:
        cleaned = validate_text(text)
    except ValueError as error:
        return f"{DISCLOSURE}\n\n{error}"
    try:
        scores = scorer(cleaned)
        if len(scores) != 2 or not all(
            isinstance(score, (int, float)) and math.isfinite(score) and 0 <= score <= 1
            for score in scores
        ) or not math.isclose(sum(scores), 1, abs_tol=0.001):
            raise ValueError("Invalid model output")
    except Exception:
        return (
            f"{DISCLOSURE}\n\nModel inference is temporarily unavailable. "
            "The initial model download may still be in progress; try again later."
        )
    return (
        f"{DISCLOSURE}\n\n"
        f"Class 0 activation: {scores[0] * 100:.1f}%\n\n"
        f"Class 1 activation: {scores[1] * 100:.1f}%\n\n"
        "These numbers are a demonstration of the inference pipeline only. "
        "No REAL/FAKE verdict or credibility score is provided. "
        "Only the first 256 model tokens are analyzed."
    )
