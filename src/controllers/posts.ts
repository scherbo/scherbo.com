import { postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../utilities/posts.ts";

export function postsController(): Response {
  const descSortedMeta = postsCache.descSortedMeta ?? [];
  return htmlResponse(postsTmpl(descSortedMeta));
}
