import { homeTmpl } from "../templates/pages/home.ts";
import { htmlResponse } from "../utilities/html.ts";
import { recentPostsMeta } from "../utilities/posts.ts";

export function homeController(): Response {
  return htmlResponse(homeTmpl(recentPostsMeta));
}
