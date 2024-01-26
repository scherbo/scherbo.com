import { html } from "../utilities/html.ts";

import { githubIconTmpl } from "./icons/github.ts";
import { linkedinIconTmpl } from "./icons/linkedin.ts";

const githubUrl = "https://github.com/scherbo";
const linkedinUrl = "https://www.linkedin.com/in/sergey-scherbo";

export function footerTmpl() {
  return html`
    <footer class="text-center mt-auto pb-xl">
      <div class="flex justify-center gap-x-md mb-md">
        <a href="${githubUrl}" target="_blank" class="text-sm text-secondary">${
    githubIconTmpl(35, 35, "fill-secondary")
  }</a>
        <a href="${linkedinUrl}" target="_blank" class="text-sm text-secondary">${
    linkedinIconTmpl(35, 35, "fill-secondary")
  }</a>
      </div>
      <p class="text-sm text-secondary">All rights reserved &copy; Sergey Scherbo 2024</p>
    </footer>
  `;
}
