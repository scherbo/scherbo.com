import { html } from "./html.ts";

const pathToStyles = "/static/styles.css";

export async function defineStyles() {
  if (Deno.args.includes("--dev")) {
    return html`<link rel="stylesheet" href="${pathToStyles}" />`;
  }

  const cssStr = await Deno.readTextFile(`${Deno.cwd()}${pathToStyles}`);

  return html`
    <style>
      ${cssStr}
    </style>  
  `;
}
