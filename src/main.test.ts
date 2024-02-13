import { Document } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";
import { describe, it } from "https://deno.land/std@0.214.0/testing/bdd.ts";
import {
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts";
import { App } from "./app.ts";

import { htmlResponse } from "./utilities/html.ts";
import { homeTmpl } from "./templates/pages/home.ts";
import { postsTmpl } from "./templates/pages/posts.ts";
import { postTmpl } from "./templates/pages/post.ts";
import { notFoundTmpl } from "./templates/pages/notFound.ts";

import { mockPostsCache } from "./mocks/posts.ts";
import { documentFromResponse } from "./utilities/documentFromResponse.ts";

function mockHomeController() {
  const recenMeta = mockPostsCache.getRecentMeta();
  return htmlResponse(homeTmpl(recenMeta));
}

function mockPostsController() {
  const descSortedMeta = mockPostsCache.getSortedByDateMeta();
  return htmlResponse(postsTmpl(descSortedMeta));
}

function mockPostController(_request: Request, match?: Record<string, string>) {
  const post = mockPostsCache.getPost(match?.slug as string);

  if (post) {
    return htmlResponse(postTmpl({ meta: post.meta, content: post.content }));
  }

  return htmlResponse(notFoundTmpl(undefined, `Post doesn't exist`), 404);
}

const app = new App();

app.serveStatic("/static");

app.get("/", mockHomeController);
app.get("/posts", mockPostsController);
app.get("/posts/:slug", mockPostController);

function assertSharedTemplates(document: Document) {
  // HEADER ASSERTIONS
  const header = document.querySelector('[data-id="header"]');
  assertExists(header, "Header does not exist");

  const homeIcon = header.querySelector('[data-id="home-icon"]');
  assertExists(homeIcon, "Home icon does not exist");

  const navigation = header.querySelector('[data-id="navigation"]');
  assertExists(navigation, "Navigation does not exist");

  const homeLink = navigation.querySelector('[data-id="home-link"]');
  assertExists(homeLink, "Home link does not exist");

  const postsLink = navigation.querySelector('[data-id="posts-link"]');
  assertExists(postsLink, "Posts link does not exist");

  const themeSwitcher = navigation.querySelector('[data-id="theme-switcher"]');
  assertExists(themeSwitcher, "Theme switcher does not exist");

  // FOOTER ASSERTIONS
  const footer = document.querySelector('[data-id="footer"]');
  assertExists(footer, "Footer does not exist");

  const ghLink = footer.querySelector('[data-id="gh-link"]');
  assertExists(ghLink, "Github link does not exist");

  const liLink = footer.querySelector('[data-id="li-link"]');
  assertExists(liLink, "Linkidin link does not exist");

  const copyright = footer.querySelector('[data-id="copyright"]');
  assertExists(copyright, "Copyright does not exist");
}

describe("pages", () => {
  it("home page is rendered correctly", async () => {
    const req = new Request("https://localhost:8000", {
      method: "GET",
    });

    const response = await app.handle(req);
    const document = await documentFromResponse(response);

    if (!document) throw Error("there is a problem with Home page");

    // shared templates are rendered correctly for the Home page
    assertSharedTemplates(document);

    const heading = document.querySelector('[data-id="heading"]');
    assertExists(heading, "Heading does not exist");

    const headingSecondary = document.querySelector(
      '[data-id="heading-secondary"]',
    );
    assertExists(headingSecondary, "Secondary heading does not exist");

    // only 5 most recent post links are rendered
    const firstRecentLink = document.querySelector('[data-id="recent-link-0"]');
    assertExists(firstRecentLink, "First most recent link does not exist");

    const lastRecentLink = document.querySelector('[data-id="recent-link-4"]');
    assertExists(lastRecentLink, "Last most recent link does not exist");

    const nonExistentLink = document.querySelector('[data-id="recent-link-5"]');
    assertThrows(() => assertExists(nonExistentLink), "Link should not exist");
  });

  it("posts page is rendered correctly", async () => {
    const req = new Request("https://localhost:8000/posts", {
      method: "GET",
    });

    const response = await app.handle(req);
    const document = await documentFromResponse(response);

    if (!document) throw Error("there is a problem with Posts page");

    // shared templates are rendered correctly for the Posts page
    assertSharedTemplates(document);

    const headingSecondary = document.querySelector(
      '[data-id="heading-secondary"]',
    );
    assertExists(headingSecondary, "Secondary heading does not exist");

    // all post links are rendered
    const mostRecentLink = document.querySelector('[data-id="link-0"]');
    assertExists(mostRecentLink, "Most recent link does not exist");

    const mostOldestLink = document.querySelector('[data-id="link-5"]');
    assertExists(mostOldestLink, "Most oldest link does not exist");
  });

  it("post page is rendered correctly", async () => {
    const req = new Request("https://localhost:8000/posts/test-post-one", {
      method: "GET",
    });

    const response = await app.handle(req);
    const document = await documentFromResponse(response);

    if (!document) throw Error("there is a problem with Test-post-one page");

    // shared templates are rendered correctly for the Test-post-one page
    assertSharedTemplates(document);

    const heading = document.querySelector("h1");
    assertExists(heading, "Heading does not exist");
    assertEquals(heading.textContent, "Dumbbell wants to set things right.");
  });

  it("not found page is rendered", async () => {
    const req = new Request("https://localhost:8000/asdf", {
      method: "GET",
    });

    const response = await app.handle(req);
    const document = await documentFromResponse(response);

    if (!document) throw Error("there is a problem with Not-found page");

    // shared templates are rendered correctly for the Not-found page
    assertSharedTemplates(document);

    const notFoundContent = document.querySelector(".not-found");

    if (!notFoundContent) {
      throw Error("there is a problem with Not-found-content page");
    }

    const heading = notFoundContent.querySelector("h2");
    assertExists(heading, "Heading does not exist");
    assertEquals(heading.textContent, "Not found");

    const paragraph = notFoundContent.querySelector("p");
    assertExists(paragraph, "Paragraph does not exist");
    assertEquals(
      paragraph.textContent,
      "You are looking for a page that doesn't exist...",
    );

    const homeLink = notFoundContent.querySelector("a");
    assertExists(homeLink, "Home link does not exist");
    assertEquals(homeLink.textContent, "Home page");
  });

  it("not found post page is rendered", async () => {
    const req = new Request("https://localhost:8000/posts/asdf", {
      method: "GET",
    });

    const response = await app.handle(req);
    const document = await documentFromResponse(response);

    if (!document) throw Error("there is a problem with Not-found-post page");

    // shared templates are rendered correctly for the Not-found-post page
    assertSharedTemplates(document);

    const notFoundContent = document.querySelector(".not-found");

    if (!notFoundContent) {
      throw Error("there is a problem with Not-found-content post page");
    }

    const heading = notFoundContent.querySelector("h2");
    assertExists(heading, "Heading does not exist");
    assertEquals(heading.textContent, "Not found");

    const paragraph = notFoundContent.querySelector("p");
    assertExists(paragraph, "Paragraph does not exist");
    assertEquals(paragraph.textContent, "Post doesn't exist");

    const homeLink = notFoundContent.querySelector("a");
    assertExists(homeLink, "Home link does not exist");
    assertEquals(homeLink.textContent, "Home page");
  });
});
