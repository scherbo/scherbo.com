import { homeTmpl } from '../templates/home.ts'

export function homeController(): Response {
  return new Response(
    homeTmpl(),
    {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    },
  );
}
