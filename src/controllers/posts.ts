import { postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../utilities/posts.ts";

export function postsController(): Response {
  const descSortedMeta = postsCache.getSortedByDateMeta()
  return htmlResponse(postsTmpl(descSortedMeta));
}
