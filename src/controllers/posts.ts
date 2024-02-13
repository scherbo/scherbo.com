import { postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../postsCache.ts";

export async function postsController(): Promise<Response> {
  const meta = await postsCache.getPostsMeta();
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );

  return htmlResponse(postsTmpl(sortedMeta));
}
