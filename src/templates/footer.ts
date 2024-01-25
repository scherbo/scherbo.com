import { html } from "../utilities/html.ts";

export function footerTmpl() {
  return html`
    <footer class="text-center">
      <div class="mb-md">
        <a href="/" class="text-sm text-secondary">github</a>
        <a href="/" class="text-sm text-secondary">linkedin</a>
      </div>
      <p class="text-sm text-secondary">All rights reserved &copy; Sergey Scherbo 2024</p>
    </footer>
  `
}