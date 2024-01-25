import { html } from "../utilities/html.ts";

export function headerTmpl() {
  return html`
    <header class="container container-wide flex justify-between py-lg">
      <!-- logo -->
      <a href="/" class="text-main text-sm">Logo</a>

      <!-- navigation -->
      <nav class="flex align-center gap-x-lg">
        <a href="/" class="text-main text-sm">Home</a>
        <a href="/posts" class="text-main text-sm">Posts</a>
        <a href="/posts/1" class="text-main text-sm">Post 1</a>
      </nav>
    </header>
  `;
}
