import { postTmpl } from "../templates/pages/post.ts";
import { notFoundTmpl } from "../templates/pages/notFound.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../postsCache.ts";
import { Context } from "../types.ts";

export async function postController(
  _request: Request,
  context: Context,
): Promise<Response> {
  try {
    const { meta, content } = await postsCache.getPost(
      context.route.params.slug,
    );
    return htmlResponse(postTmpl({ meta, content }));
  } catch (error) {
    return htmlResponse(notFoundTmpl(undefined, error.message), 404);
  }
}
