import argparse
import os
import sys
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen


REPOSITORY = "siddhinathchakraborty/fake-news-detector-prototype"


def main():
    parser = argparse.ArgumentParser(description="Publish the approved prototype to a free Gradio Space.")
    parser.add_argument("--wait-seconds", type=int, default=600)
    arguments = parser.parse_args()
    if arguments.wait_seconds < 1:
        parser.error("--wait-seconds must be positive")
    token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")
    if not token:
        print("Deployment blocked: Hugging Face write credentials are not configured in secure secrets.", file=sys.stderr)
        return 1
    try:
        from huggingface_hub import HfApi
    except ImportError:
        print("Install the deployment dependency with: pip install huggingface_hub", file=sys.stderr)
        return 1
    api = HfApi(token=token)
    try:
        api.create_repo(repo_id=REPOSITORY, repo_type="space", space_sdk="gradio", private=False, exist_ok=True)
        api.upload_folder(
            repo_id=REPOSITORY,
            repo_type="space",
            folder_path=str(Path(__file__).parent),
            allow_patterns=["app.py", "prototype.py", "requirements.txt", "README.md"],
            commit_message="Publish clearly labeled untrained prototype",
        )
        deadline = time.monotonic() + arguments.wait_seconds
        while time.monotonic() < deadline:
            runtime = api.get_space_runtime(REPOSITORY)
            if runtime.stage == "RUNNING":
                hostname = api.space_info(REPOSITORY).host
                if not hostname:
                    print("Deployment exists, but its application hostname is not available yet.", file=sys.stderr)
                    return 1
                url = f"https://{hostname}"
                try:
                    with urlopen(Request(url, headers={"User-Agent": "portfolio-demo-verifier"}), timeout=30) as response:
                        body = response.read(1_000_000).decode("utf-8", errors="replace")
                        if response.status == 200 and "Untrained Prototype" in body:
                            print(f"Verified application: {url}")
                            print(f"Space: https://huggingface.co/spaces/{REPOSITORY}")
                            return 0
                except (URLError, TimeoutError):
                    pass
            if runtime.stage in ("BUILD_ERROR", "RUNTIME_ERROR", "PAUSED"):
                print(f"Deployment is not live: {runtime.stage}. Inspect the Space logs.", file=sys.stderr)
                return 1
            time.sleep(10)
    except Exception:
        print("Hugging Face deployment failed. Check write permission and the Space logs; no live URL was verified.", file=sys.stderr)
        return 1
    print("Deployment was submitted, but the live application did not pass verification before the timeout.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
