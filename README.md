# Matei Homelab Website

A personal notebook documenting a home self-hosting setup — Home Assistant, TrueNAS, the \*arr media stack, Frigate cameras, and a hand-built dashboard.

**Live site:** https://maty3378.github.io/Matei-s-home-Projects/

## Stack

Plain HTML and CSS, plus a little vanilla JavaScript (theme toggle, copy buttons, field-note search, filters and permalinks, photo lightbox). No build step, no framework.

## Files

```
index.html      the whole site
404.html        not-found page (GitHub Pages serves it automatically)
style.css       styles
script.js       small interactive bits
theme-init.js   sets light/dark before first paint (separate file so the CSP can block inline scripts)
images/         photos referenced from index.html
fonts/          self-hosted fonts + their OFL licenses (no Google Fonts requests)
robots.txt      crawler rules + sitemap pointer
sitemap.xml     single-page sitemap
```

## Deployment
 
Served via GitHub Pages, deploying from the `main` branch root — no CI, no workflow file. Pushing to `main` is enough.

## AI use

The homelab, the photos, and the problems in the field notes are all mine. That stuff actually happened on my server.

I used Claude Code as a coding assistant along the way. It helped me write and check the HTML, CSS and JavaScript, organise the files, and run some final checks before shipping.

## License

- **Code and text** (HTML, CSS, JS, writing): MIT, see [LICENSE](LICENSE).
- **Fonts** in `fonts/` are *not* covered by the MIT license. Bricolage Grotesque,
  IBM Plex Sans and IBM Plex Mono are under the SIL Open Font License 1.1; each
  font's license is next to it in `fonts/`. "Plex" is a Reserved Font Name of IBM.
- **Product names and logos** (TrueNAS, Home Assistant, Plex, Jellyfin, Frigate,
  etc.) belong to their owners. This project isn't affiliated with any of them.

---

Still very much a work in progress, and that's the point.
