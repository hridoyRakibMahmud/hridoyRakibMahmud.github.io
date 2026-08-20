# Running it on your PC before you push

## 1. Install Node

You need Node 18 or newer — the GitHub Actions workflow uses Node 20, so match that
if you're installing fresh. Download the LTS build from nodejs.org.

Check it worked:

```bash
node -v
npm -v
```

If `node` isn't recognised on Windows, close and reopen your terminal. The installer
adds it to PATH, but an already-open terminal won't see it.

## 2. Unpack and install

Put the `portfolio-react` folder wherever you keep projects, then from inside it:

```bash
cd portfolio-react
npm install
```

First run pulls React and Vite — about 200MB in `node_modules`, and it's gitignored,
so it never gets committed.

## 3. Two ways to run it, and they're not the same

### Development

```bash
npm run dev
```

Opens on `http://localhost:5173`. Edits to `src/data/content.js` appear in the
browser the moment you save. This is where you'll do all your content changes.

### Production preview — the one that matters before pushing

```bash
npm run build
npm run preview
```

Opens on `http://localhost:4173`, serving the real built output from `dist/`.

Both servers also print a **Network** URL, something like
`http://192.168.0.42:4173/`. Open that on your phone or another machine on the
same wifi:

```
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.0.42:4173/
```

That's what `host: true` in `vite.config.js` does — bind to every network
interface rather than localhost only. Testing on a real phone matters here:
the touch device path skips some behaviour (the boot sequence dismisses on tap,
hover states don't exist), and font rendering on a phone screen is the thing
recruiters will actually see.

If the Network URL doesn't load from your phone:

- Both devices must be on the **same** network. Phone on mobile data won't work.
- Ubuntu's firewall may be blocking the port: `sudo ufw allow 4173` (and
  `5173` for dev), or `sudo ufw status` to check whether ufw is even active.
- Some routers isolate wireless clients from each other ("AP isolation"). If so,
  connect the laptop to the same wifi rather than ethernet.

You can also get this without editing the config, one time:

```bash
npm run dev -- --host
```

**Always check this one before pushing.** Dev mode serves everything from the
project root regardless of the `base` setting, so a wrong base path looks perfectly
fine in `npm run dev` and produces a blank page on GitHub. The preview build is the
only local check that catches it.

---

## What to actually look at

Work through this in the browser at `localhost:4173`:

- [ ] **The typeface.** Headings should be Google Sans Flex — geometric, fairly
      round, wide. There are now two sources for it (Google Fonts, then jsDelivr
      as a fallback), so this should be solid, but it still needs a real internet
      connection to confirm — it was never verifiable where the site was built.
- [ ] **The boot sequence.** SIP lines appear one by one, progress bar fills, page
      fades in. Roughly 1.75 seconds.
- [ ] **Skipping works.** Reload, then click anywhere or press a key immediately —
      it should vanish at once. Also check the Skip button, bottom right.
- [ ] **Scroll reveals.** Cards and case studies fade up as they enter view, once
      each, not repeating when you scroll back up.
- [ ] **The six icons** render in the left column of each project.
- [ ] **Résumé download** actually downloads a working PDF, from both the hero
      button and the contact section.
- [ ] **The contact form.** Until you add a Web3Forms access key it shows your
      email address instead — that's intentional. Once the key is in, send
      yourself a test message and confirm it lands in your inbox.
- [ ] **LinkedIn** and **GitHub** open your profiles.
- [ ] **Theme toggle**, top right. Switch both ways, reload, and confirm it
      remembers. Check the contact form and the case studies in light mode too.
- [ ] **Mobile.** F12 → device toolbar → iPhone or Pixel. Check nothing overflows
      sideways and the text is readable.

### Two accessibility checks worth doing

**Reduced motion.** On Windows: Settings → Accessibility → Visual effects →
Animation effects off. Reload. The boot sequence should be skipped entirely and
everything visible immediately. This is a real setting real people use.

**JavaScript off.** F12 → Ctrl+Shift+P → type "disable javascript" → Enter, then
reload. In the built React app you'll get an empty page — that's expected and
unavoidable for any React site. What matters is that nothing is *permanently*
hidden by the animation classes, which is why they're only applied once JS confirms
it's running.

---

## If something looks wrong

**Blank page in preview, with 404s on the CSS and JS in the console.**
The `base` in `vite.config.js` doesn't match where the site is being served from.
For a repo named `rakibHridoy206.github.io` it must be `'/'`. For a project repo
like `github.com/rakibHridoy206/portfolio` it must be `'/portfolio/'`. This is the
single most common GitHub Pages failure.

**Headings in the wrong font.** Check the Network tab, filter to "font". Two
sources are configured: `fonts.googleapis.com` first, `cdn.jsdelivr.net` as a
fallback. If both failed, send me what the console says.

**`sh: 1: vite: not found`** (or `react-scripts: not found`, or any other tool
name after `npm run ...`).

Dependencies aren't installed. `npm run build` doesn't install anything — it only
runs a command that expects `node_modules` to already be there.

```bash
cd hridoy-portfolio
npm install
npm run build
```

`npm install` takes a minute or two the first time and creates a `node_modules`
folder of roughly 200MB. If you already ran it and still get this, the install
didn't finish cleanly — run it again and read the output rather than the last
line, since npm prints warnings and real errors in the same stream. A clean
install ends with a line like `added 180 packages`.

If it still fails, start over:

```bash
rm -rf node_modules package-lock.json
npm install
```

**`npm install` fails on Windows with permission errors.** Run the terminal as
Administrator, or move the folder out of OneDrive. OneDrive's file syncing and
`node_modules` don't get along.

**Port already in use.** `npm run dev -- --port 3000`.

**Nothing changes when you edit a file.** You're probably looking at the preview
build, which is a snapshot. Rebuild, or switch to `npm run dev`.

---

## One more check before you push

Open `src/data/content.js` and read it end to end. It's the whole site in one file,
and it's the last chance to catch anything that overstates what you did before it's
public and permanent.

The two items still open from our earlier passes:

- `profile.github` is `null`, which hides the GitHub button. Leave it until the
  profile has a README and a current repo pinned — this project will count as one
  once it's up.
- Your résumé still says you *architected* the multi-module migration. That word
  isn't on the site, but the PDF ships with it. Worth deciding whether you'd defend
  it in an interview.

Then push. The README in the project has the GitHub steps.
