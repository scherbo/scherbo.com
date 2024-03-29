import { NavLink } from "../../types.ts";
import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";
import { containerTmpl } from "../container.ts";

import { layoutTmpl } from "../layout.ts";

export function postsContentTmpl(postsMeta: PostMeta[]) {
  return html`
    <main class="mb-auto">
      ${
    containerTmpl({
      children: html`
          <div>
            <h2 class="text-xl text-main text-semibold mb-lg" data-id="heading-secondary">All posts</h2>

            <ul>
              ${
        postsMeta.map((post, i) =>
          html`
                <li class="md:flex-col md:gap-y-sm flex justify-between mb-lg leading-normal">
                  <a href="/posts/${post.slug}" data-id="link-${i}" class="text-sm text-main">${post.title}</a>
                  <p class="text-sm text-secondary">${
            stringifyDate(post.date)
          }</p>
                </li>
              `
        ).join("")
      }
            </ul>
          </div>
        `,
    })
  }
    </main>
  `;
}

export function postsTmpl(postsMeta: PostMeta[]) {
  return layoutTmpl({
    meta: {
      title: "All Posts on Web Development and Mental Health by Sergey Scherbo",
      description:
        "Browse through a collection of insightful articles on web development and mental health.",
      keywords: [
        "Software Development",
        "Web Development",
        "Web Dev",
        "Career",
        "Sergey Scherbo Blog",
        "Mental Health",
        "Articles",
        "Posts",
        "Trends",
        "Tips",
      ],
    },
    content: postsContentTmpl(postsMeta),
    activeNavLink: NavLink.posts,
  });
}
