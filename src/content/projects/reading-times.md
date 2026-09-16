---
title: Predicting Reading Times
kind: psycholinguistics research project
icon: book-open-text
order: 1
repo: https://github.com/razilai/lacc-project
stack: [PyTorch, LoRA, R / lme4]
highlights:
  - Scraped and cleaned a training corpus and prepared data for modeling and statistical evaluation.
  - Fine-tuned GPT-2 and Llama 1B with PyTorch to predict human reading speed; validated results against human data using mixed-effects regression.
cover: ../../assets/projects/reading-times/fig4_delta_ll.png
coverAlt: Log-likelihood gain over a no-surprisal baseline across fine-tuning steps, for GPT-2 and Llama 1B.
thumbnail: ../../assets/projects/reading-times/thumb.png
thumbnailAlt: Held-out perplexity over fine-tuning steps for each model and domain.
---

## The question

Surprisal theory links how *unexpected* a word is to how long people take to read it. This project asks whether that link changes with domain expertise: if a language model is adapted to a reader's field, does its surprisal predict that reader's reading times better?

It reproduces a recent study on reader-aligned surprisal, then extends it in two directions:

- Does the effect hold for a larger model (Llama 1B vs. GPT-2)?
- Can a domain-aligned prompt stand in for fine-tuning?

## Data

**Reading data.** The [Potsdam Textbook Corpus (PoTeC)](https://github.com/DiLi-Lab/PoTeC) pairs eye-tracking with 12 German university textbook texts in physics and biology, read by 75 students (43 physics, 32 biology). A student reading a text from their own field counts as an *expert*.

After dropping sentence-edge words, skipped words and per-reader outliers (> 3 SD), 142,125 → 123,879 reader × word data points remain. The measure analyzed is total fixation time.

**Fine-tuning corpora.** A Wikipedia scraper was seeded with PoTeC's expert-labeled terms and B.Sc. course names (e.g. *Quantenmechanik*, *Zellbiologie*), then followed links to depth 2. About 6,000 scraped articles were deduplicated, filtered for domain, and stripped of math and references:

| Corpus  | Articles | Words     | Tokens (GerPT-2) |
| ------- | -------: | --------: | ---------------: |
| Physics |    2,800 | 2,412,209 |        3,893,179 |
| Biology |    2,431 | 1,851,069 |        3,258,685 |
| Neutral |      151 |   242,582 |          377,799 |

## Method

1. **Domain adaptation.** German GPT-2 (`GerPT-2`) and a German Llama 1B (`LLaMmlein-1B`) were LoRA fine-tuned on each domain corpus, with checkpoints at 4, 16, 64 … 4096 steps.

   ![Held-out perplexity over fine-tuning steps for each model and domain](../../assets/projects/reading-times/fig1_perplexity.png)

2. **Prompting.** As a zero-shot alternative, each stimulus sentence was preceded by a random sentence from the reader's domain (20 repetitions, averaged). A *neutral* prior from the neutral corpus controls for the extra context length.
3. **Mixed-effects regression.** Log total fixation time was modeled with `lme4` (via `pymer4`), controlling for word length, frequency, position and expertise × terminology, with crossed random effects for readers and words. Each surprisal variant was compared with a no-surprisal baseline by likelihood-ratio test (n = 123,821).

## Results

Log-likelihood gain (ΔLL) over the no-surprisal baseline:

| Surprisal source          | GPT-2 | Llama 1B |
| ------------------------- | ----: | -------: |
| Base model                |  90.0 |     76.9 |
| Reader-aligned, best step | 123.2 |     84.7 |
| Aligned prompt            | 113.2 |     76.1 |
| Neutral prompt            | 111.5 |     69.4 |

- For GPT-2, reader-aligned fine-tuning steadily improves the fit, from 90.0 to 123.2 by step 4096.
- For Llama 1B, the gain is smaller. It peaks at step 1024 (84.7) and drops back to baseline by step 4096.
- In both models, a domain-aligned prompt fits better than a neutral one.
