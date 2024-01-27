import { html } from "../../utilities/html.ts";

import { layoutTmpl } from "../layout.ts";

export function postTmpl(post: string) {
  const content = html`
    <main class="container">
      <div class="post">
        ${post}
      </div>
    </main>
  `;

  return layoutTmpl({
    title: "All posts",
    description: "All posts on Scherbo.com",
    content,
  });
}
