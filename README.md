# Shinsei 心性: portfolio site

A plain HTML and CSS site for the Shinsei series of paintings and scrolls. It needs no build tool and can be hosted for free on GitHub Pages.

## What's in the folder

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `works.html` | Scrolls and paintings gallery |
| `practice.html` | About the practice |
| `writings.html` | Research notes, listed with short summaries |
| `contact.html` | Contact details |
| `assets/works.js` | **The list of works.** Edit this to add pieces |
| `assets/site.css` | All styles and colours |
| `images/` | Photos of the works |

## Add a work

1. Put the photo in `images/`, for example `images/scroll-01.jpg`. Long edge of about 2000 px is plenty.
2. Open `assets/works.js` and add or edit an entry:

```js
{ type: "scroll", title: "Sakura at dusk", year: "2026", medium: "Sumi on washi, hanging scroll",
  size: "135 × 45 cm", image: "scroll-01.jpg", ratio: 0.33, note: "", home: true },
```

- `type`: `"scroll"` or `"painting"`
- `ratio`: width ÷ height of the photo
- `home: true` shows it on the home page
- `note`: an optional sentence shown in the full-screen view

Delete the placeholder entries once real works are in.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `shinsei`.
2. Upload everything in this folder, including the hidden `.nojekyll` file, to the repository's main branch.
3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at `https://<your-username>.github.io/shinsei/`.

To use your own domain, add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

## Still to fill in

- Real works and photos in `assets/works.js` and `images/`
- Email and Instagram in `contact.html`
- Full texts of the research notes, once each is cleared for publication
