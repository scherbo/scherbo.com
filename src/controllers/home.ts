import { homeTmpl } from "../templates/pages/home.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsMetaCache } from "../postsCache.ts";

export async function homeController(): Promise<Response> {
  const meta = await postsMetaCache.getPostsMeta();
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );
  const recentMeta = sortedMeta.slice(0, 5);

  return htmlResponse(homeTmpl(recentMeta));
}
