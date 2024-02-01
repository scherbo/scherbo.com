import { html } from "../utilities/html.ts";

import { githubIconTmpl } from "./icons/github.ts";
import { linkedinIconTmpl } from "./icons/linkedin.ts";

const githubUrl = "https://github.com/scherbo";
const linkedinUrl = "https://www.linkedin.com/in/sergey-scherbo";

export function footerTmpl() {
  return html`
    <footer class="text-center mt-7.5 mb-7.5">
      <div class="flex justify-center gap-x-md mb-md">
        <a href="${githubUrl}" target="_blank" class="text-sm text-secondary">${
    githubIconTmpl({ width: 35, height: 35, classes: "fill-secondary hover:fill-main" })
  }</a>
        <a href="${linkedinUrl}" target="_blank" class="text-sm text-secondary">${
    linkedinIconTmpl({ width: 35, height: 35, classes: "fill-secondary hover:fill-main" })
  }</a>
      </div>
      <p class="text-sm text-secondary">All rights reserved &copy; Sergey Scherbo 2024</p>
    </footer>
  `;
}
