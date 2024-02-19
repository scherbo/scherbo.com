import { serveDir } from "https://deno.land/std@0.212.0/http/file_server.ts";
import { matchRoute } from "./utilities/matchRoute.ts";
import { htmlResponse } from "./utilities/html.ts";
import { notFoundTmpl } from "./templates/pages/notFound.ts";
import { Context } from "./types.ts";
import { getQueryParams } from "./utilities/getQueryParams.ts";
import { getDirPath } from "./utilities/getDirPath.ts";

type RegisteredRoute = {
  pathToMatch: string;
  handler: (
    request: Request,
    context: Context,
  ) => Response | Promise<Response>;
};

export class App {
  getRoutes: RegisteredRoute[] = [];

  staticRoutes = new Map();

  pathToStaticDir?: string;

  handle = (request: Request): Response | Promise<Response> => {
    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname;

    const dirPath = getDirPath(requestPath);
    const isStaticDir = this.staticRoutes.get(dirPath);

    // TODO: add ability to serve not only dirs but files as well
    if (isStaticDir && isStaticDir.dir) {
      return serveDir(request);
    }

    if (request.method === "GET") {
      for (const route of this.getRoutes) {
        const match = matchRoute(route.pathToMatch, requestPath);
        if (match) {
          const context: Context = {
            route: {
              query: getQueryParams(requestUrl.searchParams),
              params: match,
              path: requestUrl.pathname,
            },
          };

          return route.handler(request, context);
        }
      }
    }

    return htmlResponse(notFoundTmpl(), 404);
  };

  get = (
    pathToMatch: string,
    handler: (
      request: Request,
      context: Context,
    ) => Response | Promise<Response>,
  ): void => {
    this.getRoutes.push({ pathToMatch, handler });
  };

  static(pathToMatch: string, options: { dir: boolean; reroute?: string }) {
    this.staticRoutes.set(pathToMatch, options);
  }
}
