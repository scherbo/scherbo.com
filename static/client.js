(() => {
  // src/client/index.ts
  var themeSwitcher = document.querySelector(".theme-switcher");
  var moonIconTmpl = document.getElementById("moon-icon");
  var sunIconTmpl = document.getElementById("sun-icon");
  var themeKey = "theme";
  var themeObj = { dark: "dark", light: "light" };
  var cachedTheme = localStorage.getItem(themeKey);
  var html = document.documentElement;
  themeSwitcher?.addEventListener("click", handleThemeSwitch);
  function renderIcon(theme) {
    if (theme === themeObj.dark) {
      themeSwitcher.innerHTML = moonIconTmpl.innerHTML;
    } else {
      themeSwitcher.innerHTML = sunIconTmpl.innerHTML;
    }
  }
  function handleThemeSwitch(_event) {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === themeObj.dark
      ? themeObj.light
      : themeObj.dark;
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem(themeKey, newTheme);
    renderIcon(newTheme);
  }
  if (cachedTheme) {
    html.setAttribute("data-theme", cachedTheme);
    if (cachedTheme === themeObj.dark) {
      renderIcon(themeObj.dark);
    } else {
      renderIcon(themeObj.light);
    }
  } else {
    renderIcon(themeObj.dark);
  }
})();
