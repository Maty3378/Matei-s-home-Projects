(function () {
  var root = document.documentElement;
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { dark: "#131519", light: "#F5F3EF" };

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_COLORS[next]);
    });
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    var codeText = pre.textContent.trim();
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(codeText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = "Copy";
        }, 1500);
      });
    });
    pre.appendChild(btn);
  });

  // Field notes: filter chips by area
  var notes = document.querySelectorAll(".notes .note");
  var filters = document.querySelectorAll(".filter");
  var allCount = document.querySelector('.filter[data-filter="all"] .count');
  if (allCount) allCount.textContent = "(" + notes.length + ")";

  filters.forEach(function (btn) {
    var tag = btn.getAttribute("data-filter");
    if (tag !== "all") {
      var n = document.querySelectorAll('.notes .note[data-tag="' + tag + '"]').length;
      btn.insertAdjacentHTML("beforeend", ' <span class="count">(' + n + ")</span>");
    }
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      notes.forEach(function (note) {
        note.hidden = tag !== "all" && note.getAttribute("data-tag") !== tag;
      });
    });
  });

  // open every note when printing so nothing is hidden on paper
  window.addEventListener("beforeprint", function () {
    notes.forEach(function (note) {
      note.hidden = false;
      note.open = true;
    });
  });

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
