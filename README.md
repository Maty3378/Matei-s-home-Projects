# Matei's Home Projects

A personal website documenting my self-hosting journey — what I've built, how I set it up, and how to fix it when it breaks.

Why this site exists

I've been self-hosting for about three years now, and every setup I build teaches me something new. The problem is that I forget things: which service talks to which, why I configured something a certain way, how I fixed a problem six months ago.

This site is my solution. It's part documentation for me, part inspiration for anyone else thinking about starting their own homelab.

How it started

It began with YouTube videos about home automation. I dug up an old PC with an Intel Pentium processor and installed HAOS (Home Assistant Operating System) on it, then started adding all my devices and integrations to make everything more useful. AirCast ended up being one of my favourites.

That was also when I discovered GitHub and open source for the first time — a lot of the apps (previously called add-ons) were community made and available there. After a lot of trial and error and a lot more videos, I built my first dashboard, then kept updating it and repairing the things I broke along the way.

The upgrade

My cousin called one day to say he'd gotten his hands on a PC. Since he already had a laptop that ran games better, that machine became my next project.

I'd tried running Plex on the old computer before, but it wasn't powerful enough and had no dedicated GPU. The new PC could handle running multiple apps at once, which finally made a proper media server possible.

What's running now
Media
TrueNAS as the base — running multiple apps at the same time
Plex / Jellyfin for hosting and streaming my own movies and shows
\*The arr stack to automate the whole pipeline:
Radarr, Sonarr, Prowlarr — set up and working great
Bazarr, Cleanuparr, Profilarr — still configuring these
Security cameras

My dad wanted to buy security cameras, so when he went looking at NVRs I told him to give me the money he'd have spent and let me handle it. I set up Frigate instead.

It turned out to be one of the most rewarding parts of the whole build. He ended up with a better system than he would have bought — mine has AI recognition for cars and people.

Home dashboard

My most ambitious project, and still not finished. I tried building it directly in Home Assistant's YAML setup first, but it was never going to meet my expectations. So I started over in HTML with absolutely zero experience — Claude helped me get through it.

It's fully functioning now and connects to Home Assistant over WebSocket. What's left is the layout design and a few more useful features.

Sharing it

Thanks to Jellyfin + Tailscale, my extended family gets to use the setup too. My cousin — the one who gave me the PC — can stream and request movies and shows from his own house.

Status

Still very much a work in progress, and that's the point. This has been a really cool project and it isn't done yet.

If you're thinking about starting your own self-hosting journey, I hope some of this helps.
