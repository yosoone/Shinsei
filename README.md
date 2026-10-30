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

## Publishing an update (beta number)

The footer of every page shows the site's beta number, for example 'Beta 0.4'. It goes up by one with each update. To publish, in this folder:

```
python3 release.py "What changed"
```

That moves the number up (kept in `VERSION`), writes it into every footer, runs the check below, and commits and pushes. If the check fails, nothing is changed and the number stays where it was. Edits made straight on GitHub's website do not move the number; the next `release.py` run catches up.

## Safety: check, publish, undo

**Before publishing**, run the check in this folder:

```
python3 check.py
```

It looks for broken HTML, links to missing files, script errors, a missing hub link or mailing-list form, and a broken `feed.xml` or `robots.txt`. GitHub runs the same check on every push ('Check and publish' under the Actions tab). Once Settings → Pages → Source is set to **GitHub Actions**, a version that fails the check is never published: the live site keeps its last good version, and GitHub emails you what went wrong.

**To undo the last change**, in this folder:

```
git revert HEAD
git push
```

**To go back to a known-good version** (kept as branches named `good-YYYY-MM-DD`):

```
git fetch origin
git checkout origin/good-2026-10-20 -- .
git commit -m "Back to the good version of 20 October 2026"
git push
```

A full copy of this site, with its history, is also backed up to the external drive (`BLACK_PUNK_/00 Yoso_one Websites Back up`).

## Mailing list

The sign-up form asks for an email address first; pressing **Continue** shows a list of Yoso's newsletters (One, Yosokuro, Shinsei, River, On), with this site's own one already ticked. Each ticked box reaches Buttondown as a tag (`one`, `yosokuro`, `shinsei`, `river`, `on`), so to write to one newsletter's readers, send to that tag. The step is run by `assets/list-choice.js`, which is the same file on every site; without it the boxes simply show under the email field and the form still works. To add or rename a newsletter, change the boxes in every form, `NEWSLETTERS` in `check.py`, and this list, on every site.
