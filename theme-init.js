(function () {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  var theme =
    stored ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  document.documentElement.setAttribute("data-theme", theme);

  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta && theme === "light") themeColorMeta.setAttribute("content", "#F5F3EF");
})();
