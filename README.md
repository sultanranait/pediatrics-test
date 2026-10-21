# Pediatrics Board Review — editable homepage source

Requires Node.js 18 or newer. No dependencies or installation step.

## Run locally

Run `npm run dev` and open **http://127.0.0.1:4173**. Edit source files and
refresh the browser to see changes; no rebuild is required during development.

## Where to edit

| File/folder | Purpose |
| --- | --- |
| `src/index.html` | Homepage text, navigation, sections, and markup |
| `src/styles/custom.css` | Custom CSS and responsive overrides |
| `src/scripts/main.js` | Clone-specific homepage behavior |
| `src/styles/001-…css` through `079-…css` | Retained theme and section styles in their original cascade order |
| `src/scripts/001-…js` through `132-…js` | Retained page initialization in its original execution order |
| `public/assets/` | Local images, fonts, and third-party scripts |
| `scripts/build.cjs` | Production build |
| `server.cjs` | Development and production preview server |
| `.openai/hosting.json` | Existing Sites project identity |

The source was extracted from the supplied WordPress/Kadence HTML capture. It
preserves that design; it is not the original WordPress theme or a React app.
Search for visible text in `src/index.html` to edit content. Start your CSS
changes in `custom.css` and JavaScript changes in `main.js`.

## Validate and build

```sh
npm run check
npm run build
npm run preview
```

`dist/` is generated from `src/` and `public/`. Do not edit `dist/` directly:
a build replaces it. Deploy its contents to a static host. Stop the development
server before running the production preview, which uses the same address.
Set the `PORT` environment variable to use another port.

## Scope

This is the existing homepage clone. Other-page links stay on the homepage,
popup triggers are disabled, and forms do not submit data. Login, checkout,
payments, and other pages have no backend implementation. External videos need
Internet access. Production analytics are excluded.

`asset-manifest.json` maps original asset URLs to local files.
`scripts/restore-source.py` records the one-time migration from the original
capture. Normal development uses Node.js only. Do not rerun the migration
against a generated build.
