# Matei's Homelab

My notebook for everything I self-host at home: Home Assistant, TrueNAS, the \*arr media stack, Frigate for the cameras, and a dashboard I'm building myself.

**Live site:** https://maty3378.github.io/Matei-s-home-Projects/

## How it's built

Plain HTML and CSS, plus a bit of vanilla JavaScript for dark mode, copy buttons, searching and filtering the field notes, links to single notes, and the photo viewer. No framework and no build step, the files in this repo are exactly what gets served.

## What's where

```
index.html      the whole site
404.html        not-found page (GitHub Pages picks it up automatically)
style.css       all the styles
script.js       the interactive bits
theme-init.js   turns on dark mode before the page shows (own file because the CSP blocks inline scripts)
images/         photos used in index.html
robots.txt      crawler rules + where the sitemap is
sitemap.xml     sitemap (it's one page)
```

## Deploying

GitHub Pages serves it straight from the root of `main`. There's no CI or workflow file, pushing to `main` is all it takes.

## AI use

The homelab, the photos, and the problems in the field notes are all mine. That stuff actually happened on my server.

I used Claude Code as a coding assistant along the way. It helped me write and check the HTML, CSS and JavaScript, organise the files, and run some final checks before shipping.

## License

- **Code and text** (HTML, CSS, JS, the writing): MIT, see [LICENSE](LICENSE).
- **Product names and logos** (TrueNAS, Home Assistant, Plex, Jellyfin, Frigate,
  etc.) belong to their owners. I'm not affiliated with any of them.

---

Still very much a work in progress, and that's kind of the point.
