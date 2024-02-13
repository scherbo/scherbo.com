import { Meta } from "../../types.ts";
import { html } from "../../utilities/html.ts";

import { layoutTmpl } from "../layout.ts";

interface PostProps {
  meta: Meta;
  content: string;
}

export function postTmpl(props: PostProps) {
  const content = html`
    <main class="container">
      <div class="post">
        ${props.content}
      </div>
    </main>
  `;

  return layoutTmpl({
    meta: props.meta,
    content,
  });
}
