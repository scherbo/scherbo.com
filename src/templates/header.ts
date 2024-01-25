import { html } from "../utilities/html.ts";

import { houseIconTmpl } from "./icons/house.ts";
import { sunIconTmpl } from "./icons/sun.ts";

export function headerTmpl() {
  return html`
    <header class="container container-wide flex justify-between py-lg">
      <!-- logo -->
      <a href="/">
        ${houseIconTmpl(35, 35, 'fill-main')}
      </a>

      <!-- navigation -->
      <nav class="flex align-center gap-x-lg">
        <a href="/" class="text-main text-sm">Home</a>
        <a href="/posts" class="text-main text-sm">Posts</a>
        <a href="/posts/1" class="text-main text-sm">
          ${sunIconTmpl(35, 35, 'fill-secondary')}
        </a>
      </nav>
    </header>
  `;
}
