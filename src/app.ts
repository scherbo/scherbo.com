import { serveDir } from "https://deno.land/std@0.212.0/http/file_server.ts";
import { matchRoute } from "./utilities/matchRoute.ts";
import { htmlResponse } from "./utilities/html.ts";
import { notFoundTmpl } from "./templates/pages/notFound.ts";

type RegisteredRoute = {
  pathToMatch: string;
  handler: (request: Request, match?: Record<string, string>) => Response;
};

export class App {
  getRoutes: RegisteredRoute[] = [];
  pathToStaticDir?: string;

  handle = (request: Request): Response | Promise<Response> => {
    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname;

    if (this.pathToStaticDir && requestPath.startsWith(this.pathToStaticDir)) {
      return serveDir(request);
    }

    if (request.method === "GET") {
      for (const route of this.getRoutes) {
        const match = matchRoute(route.pathToMatch, requestPath);
        if (match) return route.handler(request, match);
      }
    }

    return htmlResponse(notFoundTmpl(), 404);
  };

  get = (
    pathToMatch: string,
    handler: (request: Request, match?: Record<string, string>) => Response,
  ): void => {
    this.getRoutes.push({ pathToMatch, handler });
  };

  serveStatic(pathToStaticDir: string) {
    this.pathToStaticDir = pathToStaticDir;
  }
}
