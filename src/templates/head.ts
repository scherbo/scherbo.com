import { html } from "../utilities/html.ts";
import { defineStyles } from "../utilities/defineStyles.ts";

interface Head {
  title: string;
  description: string;
  keywords: string[];
}

const styles = await defineStyles();

export function headTmpl(props: Head) {
  return html`
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>${props.title}</title>
      <meta name="description" content="${props.description}">
      <meta name="keywords" content="${props.keywords.join(", ")}">

      <link rel="icon" type="image/x-icon" href="/static/favicon.ico">

      <!-- TODO: add open graph meta data -->

      <!-- styles -->
      ${styles}

      <!-- scripts -->
      <script src="/static/client.js" defer></script>
      <script defer data-domain="scherbo.com" src="https://plausible.io/js/script.js"></script>
    </head> 
  `;
}
