---
title: Fake News Detector Prototype
emoji: 📰
colorFrom: yellow
colorTo: gray
sdk: gradio
app_file: app.py
pinned: false
---

# Fake News Detector — untrained prototype

This demo was adapted from [siddhi7921/fake_news_detector](https://github.com/siddhi7921/fake_news_detector), revision `22bd75bb9930ef73fd963665a32d976656a412fe`.

The original project loads `bert-base-multilingual-cased` with a **randomly initialized, untrained two-class classification head**. This demo preserves that experimental model and text preprocessing, but deliberately displays only class activations. They are **not** REAL/FAKE predictions, confidence, credibility scores, or fact-checking results. Do not use them for decisions about news. A trained and evaluated checkpoint is required before offering a genuine detector.

English, Hindi, and Bengali text can be submitted. The model downloads on the first analysis; free CPU hosting can take some time. Submitted text is not saved by this application. The UI disables flagging and analytics.

Deploy this folder as a public Gradio Space on the free CPU tier under `siddhinathchakraborty`. No inference API key is required. See `../README.md` for the deployment command and credential requirements. No public deployment URL has been verified yet.
