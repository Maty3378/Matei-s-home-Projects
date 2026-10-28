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

  // the theme-color meta sits above this script, so the browser bar can match right away
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta && theme === "light") themeColorMeta.setAttribute("content", "#F5F3EF");
})();
