import { homeTmpl } from "../templates/pages/home.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../utilities/posts.ts";

export function homeController(): Response {
  const recentMeta = postsCache.getRecentMeta()
  return htmlResponse(homeTmpl(recentMeta));
}
