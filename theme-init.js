// turns on dark mode before the page shows, so it doesn't flash white first.
// it's its own file because the CSP blocks inline scripts
try {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch (err) {
  // localStorage is blocked, just stay on light mode
}
