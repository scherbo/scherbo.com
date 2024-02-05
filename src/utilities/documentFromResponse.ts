import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

export async function documentFromResponse(response: Response) {
  const htmlString = await response.text();
  const document = new DOMParser().parseFromString(htmlString, "text/html");
  return document;
}
