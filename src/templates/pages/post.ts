import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";

import { layoutTmpl } from "../layout.ts";

interface PostProps {
  meta: PostMeta;
  content: string;
}

export function postTmpl(props: PostProps) {
  const content = html`
    <main>
      ${postHeaderTmpl(props.meta)}
      <div class="post container">
        ${props.content}
      </div>
    </main>
  `;

  return layoutTmpl({
    meta: props.meta,
    content,
  });
}

export function postHeaderTmpl(props: PostMeta) {
  return html`
    <header class="post-header">
      <div class="container mb-xl">
        <h1 class="text-main text-xl mb-md">${props.title}</h1>
        <div class="flex gap-x-md">
          <p class="text-sm"><span class="text-secondary">Date:</span>&nbsp;&nbsp;<span class="text-main">${
    stringifyDate(props.date)
  }</span></p>
          <!-- <p class="text-sm"><span class="text-secondary">Hits:</span>&nbsp;&nbsp;<span class="text-main">0</span></p> -->
        </div>
      </div>
      <div class="max-w-75 w-full mx-auto mb-md br-md of-hidden">
        <img class="w-full" src="/static/${props.slug}.webp" />
      </div>
      <div class="container text-right mb-5">
        <a class="text-main text-xs" href="${props.postImageLink}" target="_blank">Photo</a>&nbsp;&nbsp;<span class="text-secondary text-xs">${props.postImageCredit}</span>
      </div>
    </header>
  `;
}
