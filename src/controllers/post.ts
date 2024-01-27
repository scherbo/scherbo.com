import { postTmpl } from "../templates/pages/post.ts";
import { htmlResponse } from "../utilities/html.ts";
import { postsCache } from "../utilities/posts.ts";

export function postController(
  _request: Request,
  match?: Record<string, string>,
): Response {
  const postContent = postsCache.getPost(match?.slug as string)

  if (postContent) {
    return htmlResponse(postTmpl(postContent))
  }

  // TODO: add proper 404 page
  return new Response('Post not found')
}
