(function () {
  var root = document.documentElement;
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { dark: "#131519", light: "#F5F3EF" };

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        // storage blocked: the theme still switches, it just isn't remembered
      }
      if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_COLORS[next]);
    });
  }

  // Field notes: filter chips by area, plus text search
  var notes = document.querySelectorAll(".notes .note");
  var filters = document.querySelectorAll(".filter");
  var search = document.getElementById("note-search");
  var emptyMsg = document.getElementById("notes-empty");
  var activeTag = "all";
  var allCount = document.querySelector('.filter[data-filter="all"] .count');
  if (allCount) allCount.textContent = "(" + notes.length + ")";

  // read the text before copy buttons and permalinks are added, so they don't match searches
  var noteText = [];
  notes.forEach(function (note, i) {
    noteText[i] = note.textContent.toLowerCase();
  });

  function applyFilters() {
    var query = search ? search.value.trim().toLowerCase() : "";
    var shown = 0;
    notes.forEach(function (note, i) {
      var tagMatch = activeTag === "all" || note.getAttribute("data-tag") === activeTag;
      var textMatch = !query || noteText[i].indexOf(query) !== -1;
      note.hidden = !(tagMatch && textMatch);
      if (!note.hidden) shown++;
    });
    if (emptyMsg) emptyMsg.hidden = shown > 0;
  }

  function setFilter(tag) {
    activeTag = tag;
    filters.forEach(function (b) {
      var on = b.getAttribute("data-filter") === tag;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    applyFilters();
  }

  filters.forEach(function (btn) {
    var tag = btn.getAttribute("data-filter");
    if (tag !== "all") {
      var n = document.querySelectorAll('.notes .note[data-tag="' + tag + '"]').length;
      btn.insertAdjacentHTML("beforeend", ' <span class="count">(' + n + ")</span>");
    }
    btn.addEventListener("click", function () {
      setFilter(tag);
    });
  });

  if (search) search.addEventListener("input", applyFilters);

  var toggleNotes = document.getElementById("toggle-notes");
  var expanded = false;
  if (toggleNotes) {
    toggleNotes.addEventListener("click", function () {
      expanded = !expanded;
      notes.forEach(function (note) {
        if (!note.hidden) note.open = expanded;
      });
      toggleNotes.textContent = expanded ? "Collapse all" : "Expand all";
    });
  }

  // every note gets a "#" link; clicking it copies the URL instead of toggling the note
  notes.forEach(function (note) {
    if (!note.id) return;
    var link = document.createElement("a");
    link.className = "permalink";
    link.href = "#" + note.id;
    link.textContent = "#";
    link.setAttribute("aria-label", "Copy link to this note");
    link.addEventListener("click", function (e) {
      e.preventDefault();
      history.replaceState(null, "", "#" + note.id);
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(location.href).then(function () {
        link.textContent = "copied";
        setTimeout(function () {
          link.textContent = "#";
        }, 1500);
      }).catch(function () {});
    });
    note.querySelector("summary").appendChild(link);
  });

  // opening the site at …/#some-note shows that note, even if it was filtered out
  function openNoteFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var note = id && document.getElementById(id);
    if (!note || !note.matches(".notes .note")) return;
    if (search) search.value = "";
    setFilter("all");
    note.open = true;
    note.scrollIntoView();
  }
  openNoteFromHash();
  window.addEventListener("hashchange", openNoteFromHash);

  // open every note when printing so nothing is hidden on paper
  window.addEventListener("beforeprint", function () {
    notes.forEach(function (note) {
      note.hidden = false;
      note.open = true;
    });
  });

  document.querySelectorAll("pre").forEach(function (pre) {
    var codeText = pre.textContent.trim();
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(codeText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = "Copy";
        }, 1500);
      }).catch(function () {});
    });
    pre.appendChild(btn);
  });

  // Photos: click (or Enter) to view full size
  var lightbox = document.getElementById("lightbox");
  if (lightbox && lightbox.showModal) {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");

    document.querySelectorAll("figure img").forEach(function (img) {
      img.classList.add("zoomable");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "View larger: " + img.alt);

      function open() {
        var caption = img.closest("figure").querySelector("figcaption");
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : "";
        lightbox.showModal();
      }
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
      lightbox.close();
    });

    // clicking the dimmed backdrop closes it
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll("nav a[href^='#']");
  var linkByHash = {};
  navLinks.forEach(function (link) {
    linkByHash[link.getAttribute("href")] = link;
  });

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkByHash["#" + entry.target.id];
          if (!link || !entry.isIntersecting) return;
          navLinks.forEach(function (l) {
            l.classList.remove("active");
          });
          link.classList.add("active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
