# Portfolio — Md. Rakib Mahmud Hridoy

React + Vite. One page, no backend, no browser storage.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

---

## Where things live

```
src/data/content.js      ← all page content. Edit this, not the components.
src/components/          ← Boot (SIP loader), CaseStudy, Icon, useReveal hook
src/App.jsx              ← page structure
src/styles.css           ← every style
public/                  ← résumé PDF and favicon, copied to dist/ as-is
```

`LOCAL_SETUP.md` covers running and checking it on your own machine before you
push. Read that first if you haven't run a Node project before.

**To change any wording, add a project, or reorder the work — edit
`src/data/content.js` only.** Each project is an object; each block is either
`{ label, items: [...] }` for bullets or `{ label, text: '...' }` for a paragraph.
The components read whatever's in the array.

### Turning the contact form on

The form posts to **Web3Forms**, which is free for 250 submissions a month and
needs no account or server:

1. Go to `web3forms.com`, enter your email address.
2. They email you an access key.
3. Paste it into `contact.accessKey` in `src/data/content.js`.

Signup asks for a website URL. Give the address the site will live at —
`https://hridoyrakibmahmud.github.io` — even though it isn't up yet. Nothing
validates it at signup.

That's the entire setup. Submissions arrive in your inbox.

**One thing to test right after you deploy.** Web3Forms blocks some free
platform subdomains by default as an anti-abuse measure, and their docs say
certain ones won't be approved even on request — a custom domain or a paid plan
is the fix. `github.io` may or may not be affected. So the first thing to do once
the site is live is send yourself a test message *from the live site*, not just
from localhost, because that's exactly the case where it works locally and fails
in production.

If it does get blocked, three options in order of cost:

1. Email Web3Forms support with your domain and ask them to approve it.
2. Buy a custom domain (~$10–15/year) and point it at GitHub Pages. This also
   makes the site look better on an application.
3. Switch to Formspree, which has no subdomain restriction. Free tier is 50
   submissions/month — plenty for a portfolio. Change `contact.endpoint` and drop
   the `access_key` field from the request body.

Until then the fallback already handles it: if the POST fails, the form shows
your email address rather than swallowing the message.

Until a key is set, the form is replaced by your email address, so the page never
shows a form that silently fails. The key is public in the built JavaScript — that
is by design for this service, and it can only be used to send you mail.

Swapping providers later: change `contact.endpoint`, and adjust the request body
in `src/components/ContactForm.jsx`. Formspree, for instance, wants no
`access_key` field at all.

### Turning the GitHub link on

In `src/data/content.js`, `profile.github` is `null`, which hides the button.
Set it to `'https://github.com/hridoyRakibMahmud'` to show it.

Worth doing once the profile has a README describing what you build, one pinned
repo in Kotlin/Compose or Flutter written recently, and the older coursework
archived or unpinned. **This repo counts toward that** — a React portfolio with
a real build and a CI deploy is current, public work.

---

## Hosting on GitHub Pages

### 1. Create the repo

Name it **`hridoyRakibMahmud.github.io`** — matching your username exactly. That
makes it a *user site*, served from the root of the domain, which is why
`vite.config.js` has `base: '/'`.

It must be **public**. GitHub Pages only serves from public repos on the free
plan.

> Deploying to a project repo instead (e.g. `github.com/hridoyRakibMahmud/portfolio`)?
> Then the site lives at a subpath, and you must change `base` in
> `vite.config.js` to `'/portfolio/'`. Getting this wrong is the single most
> common cause of a blank page with 404s on the CSS and JS — the app builds
> fine, the browser just looks in the wrong folder.

### 2. Push

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/hridoyRakibMahmud/hridoyRakibMahmud.github.io.git
git push -u origin main
```

`node_modules` and `dist` are gitignored. You commit source, GitHub builds the
rest.

### 3. Switch Pages to Actions

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Do this *before* worrying about the first workflow run. If Source is left on
"Deploy from a branch", the workflow will fail at the deploy step.

### 4. Watch it deploy

`.github/workflows/deploy.yml` is already in the repo. Every push to `main`
installs, builds, and publishes `dist/`. Check the **Actions** tab — the first
run takes about a minute.

Live at `https://hridoyRakibMahmud.github.io`.

### 5. From then on

Edit `src/data/content.js`, commit, push. That's the whole workflow — the site
rebuilds itself.

---

## A custom domain (optional)

Buy from Namecheap, Porkbun or Cloudflare Registrar (~$10–15/year). Then
**Settings → Pages → Custom domain**, and at your registrar add a `CNAME`
record pointing to `hridoyRakibMahmud.github.io`.

Not required. A `github.io` URL on a developer's résumé is completely normal.

---

## Notes on how it's built

**The boot sequence and scroll reveals can't hide your content.** Both apply
their hidden state only when `html.js-reveal` / `html.booting` is present, and
that class is set by a small script in `index.html` that skips itself when
`prefers-reduced-motion` is on. If JavaScript fails, everything is simply
visible.

**The loader runs 1.75s** with a 4s failsafe, and any click, key, scroll or tap
skips it.

**Theme.** Dark and light, toggled from the button in the top-right corner. On a
first visit the page follows the operating system's setting; after that, the
visitor's choice is remembered in `localStorage`. That read happens in a small
script in `index.html` before first paint, so there's no flash of the wrong
colours. Every colour on the page comes from a CSS custom property — the light
palette is a token override block in `styles.css`, not a second stylesheet.

**Storage.** `localStorage` is used for exactly one thing, the theme choice, and
it's wrapped in try/catch — if storage is blocked, the toggle still works for
that visit. No cookies, no analytics, nothing to consent to.

**Fonts have a fallback.** Google Sans Flex loads from Google Fonts using the
documented v2 API syntax (`wght@100..900`). A second `@font-face` at the top of
`styles.css` points at the same typeface on jsDelivr, so if `fonts.googleapis.com`
is blocked — some corporate networks do block it — the page still gets the right
face rather than a system sans.
