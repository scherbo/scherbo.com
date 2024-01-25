import { html } from "../utilities/html.ts";

interface Head {
  title: string;
  description: string;
}

// TODO: define other meta data
export function headTmpl(props: Head) {
  return html`
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>${props.title}</title>
      <meta name="description" content="${props.description}">

      <!-- styles -->
      <link href="/static/main.css" rel="stylesheet" />

      <!-- font -->
      <link rel="preconnect" href="https://rsms.me/">
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    </head> 
  `;
}
