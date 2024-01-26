import { postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsMeta } from "../utilities/posts.ts";

export function postsController(): Response {
  return htmlResponse(postsTmpl(postsMeta));
}
