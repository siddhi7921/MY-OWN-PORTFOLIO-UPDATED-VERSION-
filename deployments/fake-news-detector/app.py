import gradio as gr

from prototype import DISCLOSURE, analyze_news


with gr.Blocks(title="Fake News Detector — Untrained Prototype", analytics_enabled=False) as demo:
    gr.Markdown("# Fake News Detector — Untrained Prototype")
    gr.Markdown(f"**{DISCLOSURE}**")
    gr.Markdown(
        "Adapted from [the original GitHub project]"
        "(https://github.com/siddhi7921/fake_news_detector). "
        "Try English, Hindi, or Bengali text. The model downloads on first use. "
        "This application does not save submissions."
    )
    headline = gr.Textbox(label="Headline or paragraph", lines=5, max_lines=10)
    analysis = gr.Textbox(label="Untrained model activations — not a verdict", lines=8)
    with gr.Row():
        analyze = gr.Button("Run prototype", variant="primary")
        gr.ClearButton([headline, analysis])
    gr.Examples(
        examples=[
            ["Government announces a new digital education policy."],
            ["सरकार ने नई शिक्षा नीति की घोषणा की।"],
            ["সরকার নতুন শিক্ষানীতি ঘোষণা করেছে।"],
        ],
        inputs=headline,
    )
    analyze.click(fn=analyze_news, inputs=headline, outputs=analysis, concurrency_limit=1)


if __name__ == "__main__":
    demo.queue(max_size=8).launch()
