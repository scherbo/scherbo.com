import { postTmpl } from "../templates/pages/post.ts";
import { notFoundTmpl } from "../templates/pages/notFound.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../postsCache.ts";

export async function postController(
  _request: Request,
  match?: Record<string, string>,
): Promise<Response> {
  try {
    const postContent = await postsCache.getPost(match?.slug as string);
    return htmlResponse(postTmpl(postContent));
  } catch (error) {
    return htmlResponse(notFoundTmpl(undefined, error.message), 404);
  }
}
