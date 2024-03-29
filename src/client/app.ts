import { Cache } from "../utilities/cache.ts";

const themeKey = "theme";

enum Theme {
  dark = "dark",
  light = "light",
}

export class App {
  themeSwitcherEl: HTMLButtonElement = document.querySelector(
    ".theme-switcher",
  )!;
  moonIconEl: HTMLElement = document.getElementById("moon-icon")!;
  sunIconEl: HTMLElement = document.getElementById("sun-icon")!;

  appRoot: HTMLElement = document.getElementById("app")!;
  html: HTMLElement = document.documentElement;

  theme?: Theme;

  DOMParser = new DOMParser();

  cache = new Cache(new Map());

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

    this.cache.set(location.pathname, document.querySelector("main"));

    if (this.isPostPage()) {
      this.fetchPostImage();
    }
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

    this.updateNavLink(document.querySelector(`nav a[href="${path}"]`)!);

    const cachedContent = this.cache.get(path);

    if (cachedContent) {
      const prevContent = document.querySelector("main")!;

      this.appRoot.replaceChild(cachedContent, prevContent);
    } else {
      const contentString = await this.fetchPageContent(path);
      const content = this.parsePageContent(contentString)!;

      this.cache.set(path, content);

      const prevContent = document.querySelector("main")!;

      this.appRoot.replaceChild(content, prevContent);

      this.attachContentLinkListeners();

      if (this.isPostPage()) {
        this.fetchPostImage();
      }
    }
  };

  handleLink = async (event: MouseEvent) => {
    event.preventDefault();

    const a = event.currentTarget as HTMLAnchorElement;
    const href = a.getAttribute("href") ?? "";

    if (href === location.pathname) return;

    // querying first nav link (always going to be "home") in case clicked link is the house icon
    this.updateNavLink(href === "/" ? document.querySelector("nav a")! : a);

    const cachedContent = this.cache.get(href);

    if (cachedContent) {
      const prevContent = document.querySelector("main")!;

      this.appRoot.replaceChild(cachedContent, prevContent);

      // update history
      history.pushState({}, "", href);
    } else {
      const contentString = await this.fetchPageContent(href);
      const content = this.parsePageContent(contentString)!;

      this.cache.set(href, content);

      const prevContent = document.querySelector("main")!;

      this.appRoot.replaceChild(content, prevContent);

      // update history
      history.pushState({}, "", href);

      // attach new content links
      this.attachContentLinkListeners();

      if (this.isPostPage()) {
        this.fetchPostImage();
      }
    }
  };

  updateNavLink = (link: HTMLAnchorElement) => {
    const activeLink = document.querySelector(
      'header nav a[data-active="true"]',
    );

    if (activeLink) {
      activeLink.classList.remove("text-main", "text-semibold");
      activeLink.classList.add("text-secondary");
      activeLink.removeAttribute("data-active");
    }

    if (link && link.parentElement?.tagName === "NAV") {
      link.classList.remove("text-secondary");
      link.classList.add("text-main", "text-semibold");
      link.setAttribute("data-active", "true");
    }
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

  isPostPage = () => {
    const postHeader = document.getElementById("post-image");
    return postHeader ? true : false;
  };

  fetchPostImage = async () => {
    const r = await fetch("/static/personal-blog-with-deno.webp");
    const b = await r.blob();

    const url = URL.createObjectURL(b);

    const img = new Image();

    img.classList.add("absolute", "left-0", "w-full", "h-full");
    img.src = url;

    const imageContainer = document.getElementById("post-image")!;
    imageContainer.append(img);
  };
}
