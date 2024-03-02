const themeKey = "theme";

enum Theme {
  dark = "dark",
  light = "light",
}

export class App {
  appRoot: HTMLElement = document.getElementById("app")!;
  themeSwitcherEl: HTMLButtonElement = document.querySelector(
    ".theme-switcher",
  )!;
  moonIconEl: HTMLElement = document.getElementById("moon-icon")!;
  sunIconEl: HTMLElement = document.getElementById("sun-icon")!;
  html: HTMLElement = document.documentElement;

  theme?: Theme;

  DOMParser = new DOMParser();

  constructor() {
    this.initTheme();
    this.initRouting();
  }

  initTheme = () => {
    this.theme = localStorage.getItem(themeKey) as Theme ?? Theme.dark;

    // attach event listeners
    this.themeSwitcherEl.addEventListener("click", this.handleTheme);

    // render initial theme
    this.renderIcon(this.theme);
    this.html.setAttribute(`data-${themeKey}`, this.theme);
  };

  initRouting = () => {
    // attach header listeners
    this.attachHeaderLinkListeners();

    // attach content listeners
    this.attachContentLinkListeners();

    // handle back/forward browser buttons
    self.addEventListener("popstate", this.handlePopstate);
  };

  /*
    === Theming START ===
  */
  renderIcon(theme: Theme): void {
    if (theme === Theme.dark) {
      this.themeSwitcherEl.innerHTML = this.moonIconEl.innerHTML;
    }

    if (theme === Theme.light) {
      this.themeSwitcherEl.innerHTML = this.sunIconEl.innerHTML;
    }
  }

  handleTheme = () => {
    const currentTheme = this.html.getAttribute(`data-${themeKey}`);
    const newTheme = currentTheme === Theme.dark ? Theme.light : Theme.dark;

    this.html.setAttribute(`data-${themeKey}`, newTheme);
    localStorage.setItem(themeKey, newTheme);

    this.renderIcon(newTheme);
  };
  /*
    === Theming END ===
  */

  /*
    === Routing START ===
  */
  attachContentLinkListeners = () => {
    const contentLinks = document.querySelectorAll<HTMLAnchorElement>("main a");
    const clientLinks = Array.from(contentLinks).filter((link) =>
      link.getAttribute("href")?.startsWith("/")
    );

    clientLinks.forEach((cl) => cl.addEventListener("click", this.handleLink));
  };

  attachHeaderLinkListeners = () => {
    const headerLinks = document.querySelectorAll<HTMLAnchorElement>(
      "header a",
    );
    const clientLinks = Array.from(headerLinks).filter((link) =>
      link.getAttribute("href")?.startsWith("/")
    );

    clientLinks.forEach((cl) => cl.addEventListener("click", this.handleLink));
  };

  handlePopstate = async () => {
    const path = location.pathname;

    const contentString = await this.fetchPageContent(path);
    const content = this.parsePageContent(contentString)!;

    const prevContent = document.querySelector("main")!;

    this.appRoot.replaceChild(content, prevContent);

    this.attachContentLinkListeners();
  };

  handleLink = async (event: MouseEvent) => {
    event.preventDefault();

    const a = event.currentTarget as HTMLAnchorElement;
    const href = a.getAttribute("href") ?? "";

    if (href === location.pathname) return;

    // fetch new view
    const contentString = await this.fetchPageContent(href);
    const content = this.parsePageContent(contentString)!;

    const prevContent = document.querySelector("main")!;

    this.appRoot.replaceChild(content, prevContent);

    // update history
    history.pushState({}, "", href);

    // attach new content links
    this.attachContentLinkListeners();
  };

  fetchPageContent = async (path: string) => {
    const res = await fetch(`${path}?clientside=true`);
    const data = await res.text();

    return data;
  };

  parsePageContent = (raw: string) => {
    const dom = this.DOMParser.parseFromString(raw, "text/html");
    const content = dom.querySelector("main");

    return content;
  };
  /*
    === Routing END ===
  */
}
