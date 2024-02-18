import { PostMeta } from "../../types.ts";
import { html } from "../../utilities/html.ts";
import { stringifyDate } from "../../utilities/stringifyDate.ts";
import { containerTmpl } from "../container.ts";

import { layoutTmpl } from "../layout.ts";

interface PostProps {
  meta: PostMeta;
  content: string;
}

export function postTmpl(props: PostProps) {
  const content = html`
    <main>
      ${postHeaderTmpl(props.meta)}
      ${
    containerTmpl({
      classes: "post",
      children: props.content,
    })
  }
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

      <!-- Post heading -->
      ${
    containerTmpl({
      classes: "mb-xl",
      children: html`
          <h1 class="text-main text-xl mb-md">${props.title}</h1>
          <div class="flex gap-x-md">
            <p class="text-sm"><span class="text-secondary">Date:</span>&nbsp;&nbsp;<span class="text-main">${
        stringifyDate(props.date)
      }</span></p>
            <!-- <p class="text-sm"><span class="text-secondary">Hits:</span>&nbsp;&nbsp;<span class="text-main">0</span></p> -->
          </div>
        `,
    })
  }

      <!-- Post image -->
      ${
    containerTmpl({
      classes: "p0",
      children: html`
          <div class="mb-md br-md of-hidden">
            <img class="w-full" src="/static/${props.slug}.webp" />
          </div>
        `,
      wide: true,
    })
  }

      <!-- Post credit -->
      ${
    containerTmpl({
      classes: "text-right mb-5",
      children: html`
          <a class="text-main text-xs" href="${props.postImageLink}" target="_blank">Photo</a>&nbsp;&nbsp;<span class="text-secondary text-xs">${props.postImageCredit}</span>
        `,
    })
  }

    </header>
  `;
}
