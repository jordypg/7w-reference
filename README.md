# 7w-reference

Live: **https://jordypg.github.io/7w-reference/**

## Approach

A plain static site — `index.html`, `styles.css`, and a single JS data file (`cards-data.js`). No build step, no framework, no bundler. The browser loads the files directly.

Hosted on GitHub Pages, served from the `main` branch root. Pushing to `main` triggers an automatic Pages rebuild; the live URL above updates within a minute or so.

## Local development

Open `index.html` in a browser, or serve the directory with any static server:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```
