import { html } from "../utilities/html.ts";

import { layoutTmpl } from "./layout.ts";

export function homeTmpl() {
  const content = html`
    <main>
      <div class="text-center">
        <h2 class="text-xl text-main text-semibold">Hey! I'm Sergey Scherbo.</h2>
        <h2 class="text-xl text-main text-semibold">And I do web stuff 🕸️</h2>
      </div>
    </main>
  `

  return html`
    ${layoutTmpl({
      title: "Sergey Scherbo",
      description: "I write about web development",
      content,
    })}
  `;
}
