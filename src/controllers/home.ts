import { homeTmpl } from "../templates/pages/home.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../postsCache.ts";

export async function homeController(): Promise<Response> {
  const meta = await postsCache.getPostsMeta("meta");
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );
  const recentMeta = sortedMeta.slice(0, 5);

  return htmlResponse(homeTmpl(recentMeta));
}
