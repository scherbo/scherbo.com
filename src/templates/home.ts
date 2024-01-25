import { html } from "../utilities/html.ts";

import { layoutTmpl } from "./layout.ts";

const postList = [
  { title: 'Some intriguing post name', date: '18-03-2024' },
  { title: 'Another magnificent post name', date: '10-02-2024' },
  { title: 'The last post in the list!!!', date: '28-01-2024' },
]

export function homeTmpl() {
  const content = html`
    <main class="container">
      <div style="margin-top: 150px; margin-bottom: 120px;">
        <h2 class="text-xl text-main text-semibold mb-sm">Hey! I'm Sergey Scherbo.</h2>
        <h2 class="text-xl text-main text-semibold">And I do web stuff 🕸️</h2>
      </div>

      <!-- fake recent posts -->
      <div>
        <h3 class="text-lg text-main text-semibold mb-lg">Recent posts</h3>

        <ul>
          ${postList.map((post, i) => html`
            <li class="flex justify-between">
              <p class="text-sm text-main">${post.title}</p>
              <p class="text-sm text-secondary">${post.date}</p>
            </li>
            ${i !== postList.length - 1 ? html`<hr class="my-md" />` : ''}
          `).join('')}
        </ul>
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
