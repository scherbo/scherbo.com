export const html = String.raw;

export function htmlResponse(htmlTmpl: string, status = 200): Response {
  return new Response(htmlTmpl, {
    status,
    headers: {
      "content-type": "text/html",
    },
  });
}
