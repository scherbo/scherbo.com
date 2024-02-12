import { html } from "../utilities/html.ts";
import { defineStyles } from "../utilities/defineStyles.ts";

interface Head {
  title: string;
  description: string;
}

const styles = await defineStyles();

// TODO: define other meta data
export function headTmpl(props: Head) {
  return html`
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>${props.title}</title>
      <meta name="description" content="${props.description}">

      <!-- styles -->
      ${styles}

      <!-- scripts -->
      <script src="/static/index.js" defer></script>
    </head> 
  `;
}
