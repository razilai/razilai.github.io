---
title: ClearTerms
kind: Agentic web app
icon: scroll-text
order: 4
repo: https://github.com/razilai/ClearTerms
stack: [FastAPI, PostgreSQL, PydanticAI, Ollama]
highlights:
  - Co-Built a web app and Chrome extension that use an LLM to break terms-of-service documents into clause categories and give each user a personal verdict.
  - Caches each analysis by a hash of the normalized text, so changing a preference updates past verdicts without rerunning the model.
cover: ../../assets/projects/clearterms/report.png
coverAlt: ClearTerms report rating six clause categories as Clear, Standard or Aggressive, with quoted evidence.
thumbnail: ../../assets/projects/clearterms/thumb.png
thumbnailAlt: ClearTerms architecture diagram showing the Chrome extension and web app, the FastAPI backend with its analysis cache, LLM agent and preference filter, and PostgreSQL.
---

## What it does

ClearTerms helps people understand the terms of service they agree to. The Chrome extension detects and extracts terms from the current page. The web app lets users submit terms directly, review past analyses, choose the clause categories they care about, and join the forum and messages.

ClearTerms was built as a three-person team project.

## How analysis works

Each document is analyzed once. The backend splits the text into chunks, has the model classify clauses into categories with supporting evidence, and caches the category-level results by a hash of the normalized text.

A personal verdict is then calculated from each user's preferences. Changing a preference updates existing verdicts without calling the model again.

Model calls go to OpenRouter when it's configured, with a local Ollama model as automatic failover.

## Architecture

![ClearTerms architecture: the Chrome extension and React web app call the FastAPI backend, which normalizes and hashes the text, checks the analysis cache, queues cache misses for the LLM agent, and filters results by user preferences into a verdict, with PostgreSQL for storage](../../assets/projects/clearterms/architecture.png)

- **Backend:** FastAPI, SQLAlchemy and Alembic on PostgreSQL, with MinIO for attachments. Layers depend in one direction: `api → services → db / agent`. The `agent` package owns prompts, chunking and parsing, and knows nothing about users or caching.
- **Frontend:** React, TypeScript, Vite and Mantine.
- **Extension:** a thin Chrome Manifest V3 extension (TypeScript, esbuild) that extracts terms, relays the web-app token and sends analysis requests through its background worker.
- **Deployment:** Docker Compose (with an optional NVIDIA GPU overlay), deployed to an Azure VM by a GitHub Actions CD workflow.

## Testing

The pytest suite is split by intent: unit, integration, security (authentication, authorization and hostile input), system (cross-component and end-to-end Compose checks) and stress (concurrency and load). A `--fast` flag skips model loading and stress tests for everyday runs.
