export function postController(
  _request: Request,
  match?: Record<string, string>,
): Response {
  return new Response(`post page #${match?.id}!`);
}
