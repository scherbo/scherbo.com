import { NavLink } from "../../types.ts";
import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";

import { layoutTmpl } from "../layout.ts";

export function homeTmpl(recentPosts: PostMeta[]) {
  const content = html`
    <main class="container mb-auto">
      <div class="mb-12">
        <h2 class="text-xl text-main text-semibold mb-sm">Hey! I'm Sergey Scherbo.</h2>
        <h2 class="text-xl text-main text-semibold">And I do web stuff 🕸️</h2>
      </div>

      <div>
        <h3 class="text-lg text-main text-semibold mb-lg">Recent posts</h3>

        <ul>
          ${
    recentPosts.map((post, i) =>
      html`
            <li class="flex justify-between">
              <a href="/posts/${post.slug}" class="text-sm text-main">${post.title}</a>
              <p class="text-sm text-secondary">${stringifyDate(post.date)}</p>
            </li>
            ${i !== recentPosts.length - 1 ? html`<hr class="my-md" />` : ""}
          `
    ).join("")
  }
        </ul>
      </div>
    </main>
  `;

  return html`
    ${
    layoutTmpl({
      title: "Sergey Scherbo",
      description: "I write about web development",
      content,
      activeNavLink: NavLink.home,
    })
  }
  `;
}
