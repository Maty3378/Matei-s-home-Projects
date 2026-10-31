// Everything interactive on the page. No framework, just plain JS.
// Dark mode gets turned on early by theme-init.js, this file only handles the button.

const root = document.documentElement;


// ---------- dark mode button ----------

document.getElementById("theme-toggle").addEventListener("click", () => {
  root.classList.toggle("dark");

  try {
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  } catch (err) {
    // can't save it, it'll just reset next visit
  }
});


// ---------- field notes: search + filters ----------

const notes = document.querySelectorAll(".notes .note");
const filterButtons = document.querySelectorAll(".filter");
const searchBox = document.getElementById("note-search");
const noResults = document.getElementById("notes-empty");
let currentTag = "all";

// grab the text now, before the "#" links get added to each note
const noteText = Array.from(notes, (note) => note.textContent.toLowerCase());

function filterNotes() {
  const query = searchBox.value.trim().toLowerCase();
  let shown = 0;

  notes.forEach((note, i) => {
    const tagOk = currentTag === "all" || note.dataset.tag === currentTag;
    const textOk = query === "" || noteText[i].includes(query);
    note.hidden = !(tagOk && textOk);

    if (!note.hidden) {
      shown++;
      // open matches while searching so you can see what matched
      if (query) note.open = true;
    }
  });

  noResults.hidden = shown > 0;
}

function setTag(tag) {
  currentTag = tag;
  filterButtons.forEach((btn) => {
    const active = btn.dataset.filter === tag;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active);
  });
  filterNotes();
}

filterButtons.forEach((btn) => {
  const tag = btn.dataset.filter;
  const count = tag === "all"
    ? notes.length
    : document.querySelectorAll(`.notes .note[data-tag="${tag}"]`).length;

  btn.insertAdjacentHTML("beforeend", ` <span class="count">(${count})</span>`);
  btn.addEventListener("click", () => setTag(tag));
});

searchBox.addEventListener("input", filterNotes);


// ---------- expand / collapse all ----------

const expandButton = document.getElementById("toggle-notes");
let allOpen = false;

expandButton.addEventListener("click", () => {
  allOpen = !allOpen;
  notes.forEach((note) => {
    if (!note.hidden) note.open = allOpen;
  });
  expandButton.textContent = allOpen ? "Collapse all" : "Expand all";
});


// ---------- copying ----------

// copy some text, then swap the button label for a moment so you know it worked
function copyText(text, el, label, doneLabel) {
  if (!navigator.clipboard) return; // only exists on https / localhost

  navigator.clipboard.writeText(text)
    .then(() => {
      el.textContent = doneLabel;
      setTimeout(() => {
        el.textContent = label;
      }, 1500);
    })
    .catch((err) => console.warn("copy failed:", err));
}

// "#" next to each note title, copies a direct link to it
notes.forEach((note) => {
  if (!note.id) return;

  const link = document.createElement("a");
  link.className = "permalink";
  link.href = "#" + note.id;
  link.textContent = "#";
  link.setAttribute("aria-label", "Copy link to this note");

  link.addEventListener("click", (e) => {
    e.preventDefault(); // don't jump to it, just update the url and copy it
    history.replaceState(null, "", "#" + note.id);
    copyText(location.href, link, "#", "copied");
  });

  note.querySelector("summary").appendChild(link);
});

// copy button on every code block
document.querySelectorAll("pre").forEach((pre) => {
  const code = pre.textContent.trim();

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-btn";
  btn.textContent = "Copy";
  btn.addEventListener("click", () => copyText(code, btn, "Copy", "Copied"));

  pre.appendChild(btn);
});


// ---------- opening a note from a link ----------

function openNoteFromHash() {
  let id;
  try {
    id = decodeURIComponent(location.hash.slice(1));
  } catch (err) {
    return; // broken hash, ignore it
  }
  if (!id) return;

  const note = document.getElementById(id);
  if (!note || !note.matches(".notes .note")) return;

  // the search or a filter might be hiding it
  searchBox.value = "";
  setTag("all");

  note.open = true;
  note.scrollIntoView();
}

openNoteFromHash();
window.addEventListener("hashchange", openNoteFromHash);


// ---------- printing ----------
// print every note opened up, then put them back how they were

let openBeforePrint = [];

window.addEventListener("beforeprint", () => {
  openBeforePrint = Array.from(notes, (note) => note.open);
  notes.forEach((note) => {
    note.hidden = false;
    note.open = true;
  });
});

window.addEventListener("afterprint", () => {
  notes.forEach((note, i) => {
    note.open = openBeforePrint[i];
  });
  filterNotes();
});


// ---------- photos ----------

// if a photo with data-fallback won't load, show the "coming soon" box instead
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const useFallback = () => {
    const placeholder = img.parentNode.querySelector(".shot-placeholder");
    if (placeholder) placeholder.hidden = false;
    img.remove();
  };

  // it might have already failed before this script ran
  if (img.complete && img.naturalWidth === 0) {
    useFallback();
  } else {
    img.addEventListener("error", useFallback);
  }
});

// click (or Enter) on a photo to see it bigger
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

function openLightbox(img) {
  const caption = img.closest("figure").querySelector("figcaption");
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : "";
  lightbox.showModal();
}

document.querySelectorAll("figure img").forEach((img) => {
  img.classList.add("zoomable");
  img.tabIndex = 0;
  img.setAttribute("role", "button");
  img.setAttribute("aria-label", "View larger: " + img.alt);

  img.addEventListener("click", () => openLightbox(img));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(img);
    }
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

// clicking the dark bit around the photo closes it too
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});


// ---------- back to top ----------

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
