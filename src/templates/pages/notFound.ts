import { html } from "../../utilities/html.ts";
import { containerTmpl } from "../container.ts";

import { layoutTmpl } from "../layout.ts";

const defaultHeading = "Not found";
const defaultLine = `You are looking for a page that doesn't exist...`;

export function notFoundTmpl(heading?: string, line?: string) {
  const content = html`
    <main>
      ${
    containerTmpl({
      children: html`
          <div class="not-found">
            <h2 class="text-main text-xl text-semibold mb-lg">${
        heading ?? defaultHeading
      }</h2>
            <p class="text-main text-md mb-lg">${line ?? defaultLine}</p>
            <a class="text-main text-md" href="/">Home page</a>
          </div>
        `,
    })
  }
    </main>
  `;

  return layoutTmpl({
    meta: {
      title: "Page Not Found",
      description: "Page does not exist",
      keywords: [],
    },
    content,
  });
}
