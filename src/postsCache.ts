// deno-lint-ignore-file no-explicit-any
import matter from "gray-matter";

import { Cache } from "./utilities/cache.ts";
import { enhancedMarkdownParser } from "./utilities/enhancedMarkdownParser.ts";
import { PostMeta } from "./types.ts";

const postsDirName = "posts";
const postExtension = "md";

const postNotFoundErrorMessage = "Post not found";
const unknownErrorMessage = "Unknown error";

class PostsCache extends Cache {
  constructor(state: Map<any, any>) {
    super(state);
  }

  /**
   * if post is cached return markdown string immediately;
   *
   * if slug is valid - cache it and return markdown string
   *
   * if slug is invalid - throw error
   */
  async getPost(slug: string) {
    const cached = this.get(slug);

    if (cached) return cached;

    try {
      const mdString = await Deno.readTextFile(
        `${Deno.cwd()}/${postsDirName}/${slug}.${postExtension}`,
      );

      const { content } = matter(mdString);
      const html = enhancedMarkdownParser(content) as string;

      return this.setPost(slug, html);
    } catch (error) {
      const errorMessage = error instanceof Deno.errors.NotFound
        ? postNotFoundErrorMessage
        : unknownErrorMessage;
      throw new Error(errorMessage);
    }
  }

  setPost(slug: string, value: string) {
    return this.set(slug, value);
  }

  async getPostsMeta(key: string): Promise<PostMeta[]> {
    const cached = this.get(key);

    if (cached) return cached;

    try {
      const rawPosts = Deno.readDir(`${Deno.cwd()}/${postsDirName}`);
      const meta: PostMeta[] = [];

      for await (const post of rawPosts) {
        const raw = await Deno.readTextFile(`${postsDirName}/${post.name}`);
        const slug = post.name.slice(
          0,
          post.name.length - postExtension.length - 1,
        );

        const { data } = matter(raw);

        const postMeta: PostMeta = {
          date: data.date,
          title: data.title,
          slug,
        };

        meta.push(postMeta);
      }

      return this.setPostsMeta(key, meta);
    } catch (_error) {
      throw new Error("Posts meta not found...");
    }
  }

  setPostsMeta(key: string, value: any) {
    return this.set(key, value);
  }
}

export const postsCache = new PostsCache(new Map());
