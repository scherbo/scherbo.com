import { html } from "../utilities/html.ts";

import { githubIconTmpl } from "./icons/github.ts";
import { linkedinIconTmpl } from "./icons/linkedin.ts";

const githubUrl = "https://github.com/scherbo";
const linkedinUrl = "https://www.linkedin.com/in/sergey-scherbo";

export function footerTmpl() {
  return html`
    <footer class="text-center mt-7.5 mb-7.5" data-id="footer">
      <div class="flex justify-center gap-x-md mb-md">
        <a href="${githubUrl}" target="_blank" data-id="gh-link" aria-label="github-profile" class="text-sm text-secondary">${
    githubIconTmpl({
      width: 35,
      height: 35,
      classes: "fill-secondary hover:fill-main",
    })
  }</a>
        <a href="${linkedinUrl}" target="_blank" data-id="li-link" aria-label="linkedin-profile" class="text-sm text-secondary">${
    linkedinIconTmpl({
      width: 35,
      height: 35,
      classes: "fill-secondary hover:fill-main",
    })
  }</a>
      </div>
      <p class="text-sm text-secondary" data-id="copyright">All rights reserved &copy; Sergey Scherbo 2024</p>
    </footer>
  `;
}
