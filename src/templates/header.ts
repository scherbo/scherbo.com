import { NavLink } from "../types.ts";
import { html } from "../utilities/html.ts";

import { houseIconTmpl } from "./icons/house.ts";
import { sunIconTmpl } from "./icons/sun.ts";

interface HeaderProps {
  activeNavLink?: NavLink
}

export function headerTmpl({ activeNavLink }: HeaderProps) {
  const homeActive = activeNavLink && activeNavLink === NavLink.home

  return html`
    <header class="container container-wide flex justify-between py-lg mb-15">
      <!-- logo -->
      <a href="/">
        ${houseIconTmpl({ width: 35, height: 35, classes: homeActive ? "fill-main" : 'fill-secondary hover:fill-main' })}
      </a>

      <!-- navigation -->
      ${navTmpl({ activeNavLink })}
    </header>
  `;
}

interface NavProps {
  activeNavLink?: NavLink
}

export function navTmpl({ activeNavLink }: NavProps) {
  return html`
    <nav class="flex align-center gap-x-lg">
      ${navLinkTmpl({ href: '/', text: 'Home', active: activeNavLink && activeNavLink === NavLink.home })}
      ${navLinkTmpl({ href: '/posts', text: 'Posts', active: activeNavLink && activeNavLink === NavLink.posts })}
      <button class="theme-switcher">
        ${sunIconTmpl({ width: 35, height: 35, classes: "fill-secondary" })}
      </button>
    </nav>
  `
}

interface NavLinkProps {
  href: string
  text: string
  active?: boolean
}

export function navLinkTmpl({ href, text, active }: NavLinkProps) {
  return html`
    <a href="${href}" class="${active ? 'text-main' : 'text-secondary'} hover:text-main text-sm">${text}</a>
  `
}
