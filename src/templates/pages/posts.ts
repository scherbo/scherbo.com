import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";

import { layoutTmpl } from "../layout.ts";

export function postsTmpl(postsMeta: PostMeta[]) {
  const content = html`
    <main class="container">
      <div>
        <h2 class="text-xl text-main text-semibold mb-lg">All posts</h2>

        <ul>
          ${
    postsMeta.map((post, i) =>
      html`
            <li class="flex justify-between">
              <a href="/posts/${post.slug}" class="text-sm text-main">${post.title}</a>
              <p class="text-sm text-secondary">${stringifyDate(post.date)}</p>
            </li>
            ${i !== postsMeta.length - 1 ? html`<hr class="my-md" />` : ""}
          `
    ).join("")
  }
        </ul>
      </div>
    </main>
  `;

  return layoutTmpl({
    title: "All posts",
    description: "All posts on Scherbo.com",
    content,
  });
}
