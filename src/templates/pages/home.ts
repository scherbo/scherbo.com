import { NavLink } from "../../types.ts";
import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";
import { containerTmpl } from "../container.ts";

import { layoutTmpl } from "../layout.ts";

export function homeContentTmpl(recentPosts: PostMeta[]) {
  return html`
    <main class="mb-auto">
      ${
    containerTmpl({
      children: html`
          <div class="mb-12">
            <h2 class="text-xl text-main text-semibold mb-sm" data-id="heading">Hey! I'm Sergey Scherbo.</h2>
            <h2 class="text-xl text-main text-semibold">And I do web stuff 🕸️</h2>
          </div>

          <div>
            <h3 class="text-lg text-main text-semibold mb-lg" data-id="heading-secondary">Recent posts</h3>

            <ul>
              ${
        recentPosts.map((post, i) =>
          html`
                <li class="md:flex-col md:gap-y-sm flex justify-between mb-lg leading-normal">
                  <a href="/posts/${post.slug}" data-id="recent-link-${i}" class="text-sm text-main">${post.title}</a>
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

export function homeTmpl(recentPosts: PostMeta[]) {
  return html`
    ${
    layoutTmpl({
      meta: {
        title: "Sergey Scherbo Personal Blog",
        description:
          "Explore insightful articles on web development and mental health. Stay updated with the latest trends and tips.",
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
      content: homeContentTmpl(recentPosts),
      activeNavLink: NavLink.home,
    })
  }
  `;
}
