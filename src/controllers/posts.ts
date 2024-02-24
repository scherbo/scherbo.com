import { postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsMetaCache } from "../postsCache.ts";

export async function postsController(): Promise<Response> {
  const meta = await postsMetaCache.getPostsMeta();
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );

  return htmlResponse(postsTmpl(sortedMeta));
}
