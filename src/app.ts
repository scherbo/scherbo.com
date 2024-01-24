import { matchRoute } from "./utilities/matchRoute.ts";

type RouteObject = {
  pathToMatch: string;
  handler: (request: Request, match: Record<string, string>) => Response;
};

export class App {
  getRoutes: RouteObject[];

  constructor() {
    this.getRoutes = [];
  }

  handle = (request: Request): Response => {
    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname;

    if (request.method === "GET") {
      for (const route of this.getRoutes) {
        const match = matchRoute(route.pathToMatch, requestPath);
        if (match) return route.handler(request, match);
      }
    }

    return new Response("Page not found", { status: 404 });
  };

  get = (
    pathToMatch: string,
    handler: (request: Request, match?: Record<string, string>) => Response,
  ): void => {
    this.getRoutes.push({ pathToMatch, handler });
  };
}
