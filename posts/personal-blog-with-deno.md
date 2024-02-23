---
date: 2024-02-23
title: Building personal blog with Deno and Deno Deploy
description: Learn step-by-step how to harness Deno's powerful features to build a robust and modern blog, and seamlessly deploy it to the cloud with Deno Deploy.
keywords:
  - Deno
  - Deno Deploy
  - TypeScript
  - HTML
  - HTML5
  - CSS
  - CSS3
  - Static Website
  - Blog
  - Web Development
postImageCredit: by Pixabay from Pexels
postImageLink: https://www.pexels.com/photo/white-windmill-414837/
---

Initially I just wanted to build a static website using Node.js + some Edge
Network. But then I thought: "building such a trivial website is extremely
boring, especially for a Frontend Developer", so I decided to add a tiny bit of
interactivity on top.

I'm gonna split this post in two parts. In the first one I'll describe how to
build a static website using Deno and Deno Deploy. And the second one will be
about blows and whistles.

## Why I decided to use Deno?

The most convenient way to store posts/articles is in markdown files. And since
I wanna be able to read those files during run time (the motivation for this is
gonna be clear in the second part of the post) **AND** I want my website run on
the Edge - the Edge Network should supports FS API and there's one: Deno Deploy.

And since this is the first time I'm using Deno, to get the grasp of it - I'm
not gonna use any frameworks. Just Deno.

<div class="notice info">
  <h3>Other options</h3>
  <p>There's another solution which doesn't require using FS API and therefore Deno/Deno Deploy - github provides an access to the raw files in your repository through `raw.githubusercontent.com` domain, so it's possible to access static content with HTTP GET requests. For example <a href="https://raw.githubusercontent.com/scherbo/scherbo.com/main/posts/personal-blog-with-deno.md" target="_blank">click here</a> to access the content if this post.</p>

<p>If you are not interested in making your website a bit more dynamic - another (and most simplest) way would be to pre-build all the pages and push them to any Edge Network.</p>
</div>

## Project structure

The project structure is gonna look like this:

```md
.github // github actions workflows build.yml deploy.yml post // post .md files
src client // client-side code controllers scripts // scripts to bundle js/css
styles // vanilla css templates // html templates utilities

app.ts main.ts postsCache.ts types.ts static // bundled assets, images, fonts
deno.json // deno config file
```

## Building the base

If you are reading this, you are probably familiar with Express.js framework.
Let's create something similar with Deno.

```ts
// src/app.ts

type RegisteredRoute = {
  pathToMatch: string;
  handler: (
    request: Request,
    context: Context,
  ) => Response | Promise<Response>;
};

type StaticRouteOptions = {
  dir: boolean;
};

export class App {
  getRoutes: RegisteredRoute[] = [];
  staticRoutes = new Map();

  /*
    this method is responsible for checking if
    there's a registered handler for incoming request
  */
  handle = (request: Request): Response | Promise<Response> => {
    // ...
  };

  /*
    this method is resposible for registering GET handlers
  */
  get = (
    pathToMatch: string,
    handler: (
      request: Request,
      context: Context,
    ) => Response | Promise<Response>,
  ): void => {
    // ...
  };
}
```

Let's start with the `handle` method:

```ts
// src/app.ts

class App {
  getRoutes: RegisteredRoute[] = [];
  staticRoutes = new Map();

  handle = (request: Request): Response | Promise<Response> => {
    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname;

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

  // ...
}
```

Firstly, we create a new instance of request URL. Then we check if current
request is a `GET` request (we don't care about any other methods, at least for
now). If it is `GET` method - we loop through registered routes and look for a
match. If we have a match - create a new context (it's just a handy object that
might be useful for every route) and invoke matched handler. In case we haven't
found a match - return 404 page template.

I've used quite a few utilities here, let's go over each of them, starting with
`matchRoute`:

```ts
// src/utilities/matchRoute.ts

export function matchRoute(
  registeredPath: string,
  providedPath: string,
): Record<string, string> | null {
  const registered = registeredPath.split("/");
  const provided = providedPath.split("/");

  if (registered.length !== provided.length) return null;

  const match: Record<string, string> = {};

  // skip 0th element, it's always going to be an empty string
  for (let i = 1; i < registered.length; i++) {
    if (registered[i].startsWith(":")) {
      match[registered[i].slice(1)] = provided[i];
      continue;
    }

    if (registered[i].toLowerCase() !== provided[i].toLowerCase()) return null;
  }

  return match;
}
```

It accepts registered path as well as path from incoming request. We split both
paths with `/`, it allows us to conveniently compare respective path sectors.
And then we iterate over the registered path sectors and compare them to the
provided path sectors. If current sector is a variable - we add it to the
`match` object (which we gonna return if paths match). If path sectors do not
equal - then the paths do not match, and we return `null`.

The next utility is `getQueryParams`:

```ts
// src/utilities/getQueryParams.ts

export function getQueryParams(
  searchParams: URLSearchParams,
): Record<string, string> {
  const query: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    query[key] = value;
  }

  return query;
}
```

This one is pretty simple. It basically creates a plain object from incoming
`URLSearchParams`.

And lastly `htmlResponse`:

```ts
// src/utilities/htmlResponse.ts

export function htmlResponse(htmlTmpl: string, status = 200): Response {
  return new Response(htmlTmpl, {
    status,
    headers: {
      "content-type": "text/html",
    },
  });
}
```

It accept html template string and an HTTP status code and returns a new
instance of html Response.

Now let's get back the `App` and `.get()` method:

```ts
// src/app.ts

class App {
  getRoutes: RegisteredRoute[] = [];

  // ...

  get = (
    pathToMatch: string,
    handler: (
      request: Request,
      context: Context,
    ) => Response | Promise<Response>,
  ): void => {
    this.getRoutes.push({ pathToMatch, handler });
  };

  // ...
}
```

Essentially with this method we register a `handler` callback which is going to
be invoked in case `pathToMatch` matches a path in the `.handle()` method.

And that's our base. Let's create a new instance of the `App` and register some
routes. `main.ts` is going to be an entry point to our Deno program.

```ts
// src/main.ts

import { App } from "./app.ts";
import { htmlResponse } from "./utilities/htmlResponse.ts";

const app = new App();

app.get("/", () => htmlResponse(`<p>Home page</p>`));
app.get("/posts", () => htmlResponse(`<p>Posts page</p>`));
app.get(
  "/posts/:slug",
  (_request, context) =>
    htmlResponse(`<p>Post page, slug: ${context.route.params.slug}</p>`),
);

Deno.serve(app.handle);
```

To start server open terminal and run the following command:

```sh
deno run --allow-net src/main.ts
```
