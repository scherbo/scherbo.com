import { postsContentTmpl, postsTmpl } from "../templates/pages/posts.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsMetaCache } from "../postsCache.ts";
import { Context } from "../types.ts";

export async function postsController(
  _request: Request,
  context: Context,
): Promise<Response> {
  const clientside = context.route.query.clientside;
  const meta = await postsMetaCache.getPostsMeta();
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );

  return clientside
    ? htmlResponse(postsContentTmpl(sortedMeta))
    : htmlResponse(postsTmpl(sortedMeta));
}
