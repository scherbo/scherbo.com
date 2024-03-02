import { homeContentTmpl, homeTmpl } from "../templates/pages/home.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsMetaCache } from "../postsCache.ts";
import { Context } from "../types.ts";

export async function homeController(
  _request: Request,
  context: Context,
): Promise<Response> {
  const clientside = context.route.query.clientside;

  const meta = await postsMetaCache.getPostsMeta();
  const sortedMeta = meta.slice().sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );
  const recentMeta = sortedMeta.slice(0, 5);

  return clientside
    ? htmlResponse(homeContentTmpl(recentMeta))
    : htmlResponse(homeTmpl(recentMeta));
}
