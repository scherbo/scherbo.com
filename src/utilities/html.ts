export const html = String.raw;

export function htmlResponse(htmlTmpl: string): Response {
  return new Response(htmlTmpl, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
}
