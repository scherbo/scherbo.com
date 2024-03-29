import matter from "gray-matter";

import { Cache } from "./utilities/cache.ts";
import { enhancedMarkdownParser } from "./utilities/enhancedMarkdownParser.ts";
import { IPostsCache, IPostsMetaCache, PostMeta } from "./types.ts";
import { extendPostMeta } from "./utilities/extendPostMeta.ts";
import { PostData } from "./types.ts";
import { mockPostsCache, mockPostsMetaCache } from "./mocks/posts.ts";
import { ErrorMessages } from "./types.ts";

const postsMetaDefaultKey = "postsmeta";

const postsDirName = "posts";
const postExtension = "md";

class PostsMetaCache extends Cache<string, PostMeta[]>
  implements IPostsMetaCache {
  constructor(state: Map<string, PostMeta[]>) {
    super(state);
  }

  async getPostsMeta(key = postsMetaDefaultKey): Promise<PostMeta[]> {
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

        const postMeta = extendPostMeta(data, slug);

        meta.push(postMeta);
      }

      return this.setPostsMeta(key, meta);
    } catch (_error) {
      throw new Error(ErrorMessages.postsMetaNotFound);
    }
  }

  setPostsMeta(key = postsMetaDefaultKey, data: PostMeta[]): PostMeta[] {
    return this.set(key, data);
  }
}

class PostsCache extends Cache<string, PostData> implements IPostsCache {
  constructor(state: Map<string, PostData>) {
    super(state);
  }

  /**
   * if post is cached return html string immediately;
   *
   * if slug is valid - cache it and return html string
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

      const { data, content } = matter(mdString);
      const html = enhancedMarkdownParser(content) as string;

      const postMeta = extendPostMeta(data, slug);

      return this.setPost(slug, { meta: postMeta, content: html });
    } catch (error) {
      const errorMessage = error instanceof Deno.errors.NotFound
        ? ErrorMessages.postNotFound
        : ErrorMessages.unknown;
      throw new Error(errorMessage);
    }
  }

  setPost(slug: string, data: PostData): PostData {
    return this.set(slug, data);
  }
}

const testing = Deno.args.includes("--test");

export const postsCache = testing ? mockPostsCache : new PostsCache(new Map());
export const postsMetaCache = testing
  ? mockPostsMetaCache
  : new PostsMetaCache(new Map());
