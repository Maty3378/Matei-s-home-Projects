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
images/         photos referenced from index.html
robots.txt      crawler rules + sitemap pointer
sitemap.xml     single-page sitemap
```

## Deployment
 
Served via GitHub Pages, deploying from the `main` branch root — no CI, no workflow file. Pushing to `main` is enough.

---

Still very much a work in progress, and that's the point.
