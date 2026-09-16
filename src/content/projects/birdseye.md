---
title: BirdsEye
kind: Geospatial business analytics
icon: map-pinned
order: 3
repo: https://github.com/razilai/birdseye
stack: [DuckDB, FastAPI, MapLibre, deck.gl]
highlights:
  - Built a Python/SQL ETL pipeline with DuckDB to validate and aggregate geospatial data across business categories.
  - Powers an interactive map dashboard for analyzing business density and identifying potentially underserved areas.
cover: ../../assets/projects/birdseye/hexagons.jpg
coverAlt: Hexagon map of food-and-drink business density in Tel Aviv.
thumbnail: ../../assets/projects/birdseye/thumb.jpg
thumbnailAlt: Hexagon map of food-and-drink business density in Tel Aviv.
---

## What it does

BirdsEye gives a bird's-eye view of the businesses in any city. Pick a city and a category, such as food and drink, and the map shows where those businesses cluster and where they're scarce.

It's meant for business analysts, city officials, urban planners, or anyone deciding where to open a business. It helps spot areas that may be underserved.

## Data

Points of interest come from the public [Overture Maps](https://overturemaps.org/) releases, mostly sourced from OpenStreetMap. Each city has tens of thousands of places, each with a category hierarchy that the pipeline maps into 13 business categories.

## ETL pipeline

`etl.py` is a thin driver that runs three stages in order and reports progress to the dashboard:

1. **Extract** is the only stage that touches Overture. It resolves the city boundary, fetches every place inside it, lists the overlapping [H3](https://h3geo.org/) resolution-9 cells, and saves the raw run as Parquet with metadata.
2. **Transform** assigns each place to its H3 cell using DuckDB's `h3` extension. It then builds a long-form cell × category count grid and records data-quality findings. Empty cells are kept with a count of zero.
3. **Load** pivots the counts into a wide table (one row per cell, one column per category) and adds the parent cells at resolutions 8 and 7. It then replaces the city's rows in a single transaction, so a failure never leaves a half-updated city.

Counts are stored once, at resolution 9 (≈ 0.1 km² per hexagon). The coarser hexagon sizes are just a `GROUP BY` on the parent columns, so every size adds up to the same total.

## Dashboard

A FastAPI app serves both the JSON API and a static frontend built with MapLibre and deck.gl (no build step). Users can:

- search for a city (typo-tolerant) or pick one that's already loaded
- choose a category, a hexagon or heatmap view, and fine, medium or coarse hexagons
- see a legend, category totals and data-quality counts
- download the current grid as CSV
- share the view: the URL keeps the city, category, hexagon size and view
