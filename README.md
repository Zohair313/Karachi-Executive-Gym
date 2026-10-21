# Body Factory Bali — React (Vite)

This project is the SingleFile snapshot of `bodyfactorybali.com` converted into a
**Vite + React** app, with the UI kept identical.

## Structure

```
index.html          # <head> (meta/title/links) + mount point; no CSP meta
vite.config.js
src/
  main.jsx          # React entry (mounts <App /> into #root)
  App.jsx           # auto-generated JSX of the original <body>
  styles.css        # byte-identical copy of the original 7 <style> blocks
  cssToStyle.js     # helper: parses inline style="..." strings into React style objects
```

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## How it was converted

- The original `<body>` DOM was walked (parse5) and emitted as JSX, preserving every
  element, attribute and text node.
- All 7 `<style>` blocks were extracted **verbatim** into `src/styles.css`
  (byte-for-byte identical to the source), so no CSS was rewritten.
- Inline `style="..."` attribute strings are converted to React style objects at
  runtime via `s()` in `src/cssToStyle.js`.
- Embedded documents (the map `<iframe srcdoc="...">`) and inline `<style>`/`<script>`
  payloads are preserved via JS strings / `dangerouslySetInnerHTML`.
- Main-domain (`bodyfactorybali.com`) links are non-clickable (their `href` was
  removed), matching the stripped source. All images are kept.

## Verified equivalence

Compared against the original using a DOM-level comparison (not text):

| Check | Result |
| --- | --- |
| Body entries (elements + text + inline payloads) | 598 = 598 |
| Attribute/tag/text differences (ignoring href + CSS whitespace) | **0** |
| `<style>` CSS bytes | **identical** (206,644 chars) |
| `<iframe srcdoc>` | **identical** |
| Inline `<style>`/`<script>` payloads in body | 25 = 25, **identical** |
| Anchors / hrefs | 53 = 53, **identical**, 0 main-domain |
| React DOM warnings | none |

The only intentional head change: the SingleFile snapshot's
`http-equiv="content-security-policy"` meta was removed, because it blocked the
app's module scripts. It does not affect rendering.

