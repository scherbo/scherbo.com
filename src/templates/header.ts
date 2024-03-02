import { NavLink } from "../types.ts";
import { html } from "../utilities/html.ts";
import { containerTmpl } from "./container.ts";

import { houseIconTmpl } from "./icons/house.ts";
import { moonIconTmpl } from "./icons/moon.ts";
import { sunIconTmpl } from "./icons/sun.ts";

interface HeaderProps {
  activeNavLink?: NavLink;
}

export function headerTmpl({ activeNavLink }: HeaderProps) {
  const homeActive = activeNavLink && activeNavLink === NavLink.home;

  return html`
    <header class="mb-15" data-id="header">
      ${
    containerTmpl({
      wide: true,
      children: html`
          <div class="flex justify-between py-lg">
            <!-- logo -->
            <a href="/" data-id="home-icon" aria-label="home-link">
              ${
        houseIconTmpl({
          width: 35,
          height: 35,
          classes: homeActive ? "fill-main" : "fill-secondary hover:fill-main",
        })
      }
            </a>

            <!-- navigation -->
            ${navTmpl({ activeNavLink })}
          </div>
        `,
    })
  }
    </header>
  `;
}

interface NavProps {
  activeNavLink?: NavLink;
}

export function navTmpl({ activeNavLink }: NavProps) {
  return html`
    <nav class="flex align-center gap-x-lg" data-id="navigation">
      ${
    navLinkTmpl({
      href: "/",
      text: "Home",
      active: activeNavLink && activeNavLink === NavLink.home,
      dataID: "home-link",
    })
  }
      ${
    navLinkTmpl({
      href: "/posts",
      text: "Posts",
      active: activeNavLink && activeNavLink === NavLink.posts,
      dataID: "posts-link",
    })
  }
      <button class="theme-switcher" data-id="theme-switcher" aria-label="switch-theme"></button>

      <template id="sun-icon">
        ${sunIconTmpl({ width: 35, height: 35, classes: "fill-secondary" })}
      </template>

      <template id="moon-icon">
        ${moonIconTmpl({ width: 35, height: 35, classes: "fill-secondary" })}
      </template>
    </nav>
  `;
}

interface NavLinkProps {
  href: string;
  text: string;
  active?: boolean;
  dataID?: string;
}

export function navLinkTmpl({ href, text, active, dataID }: NavLinkProps) {
  return html`
    <a href="${href}" data-id="${dataID}" ${
    active ? 'data-active="true"' : ""
  } aria-label="${text.toLowerCase()}-link" class="${
    active ? "text-main text-semibold" : "text-secondary"
  } hover:text-main text-sm no-decoration">${text}</a>
  `;
}
