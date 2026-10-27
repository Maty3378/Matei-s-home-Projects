// loaded in <head> without defer so the theme is set before first paint.
// kept out of the HTML so the Content-Security-Policy can forbid inline scripts.
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    // storage blocked (private mode, cookies off): fall back to the system setting
  }
  var theme =
    stored ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  document.documentElement.setAttribute("data-theme", theme);
})();
