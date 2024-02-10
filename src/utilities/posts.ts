import matter from "gray-matter";

import { PostMeta } from "../types.ts";
import { enhancedMarkdownParser } from "./enhancedMarkdownParser.ts";

class PostsCache {
  meta: PostMeta[] = [];
  posts: Map<string, string> = new Map();

  ascSortedMeta?: PostMeta[];
  descSortedMeta?: PostMeta[];

  recentMeta?: PostMeta[];

  constructor() {
    this.init();
  }

  async init() {
    const postsPath = "posts";
    const readPosts = Deno.readDir(`${Deno.cwd()}/${postsPath}`);
    const extension = ".md";

    for await (const p of readPosts) {
      const raw = await Deno.readTextFile(
        `${Deno.cwd()}/${postsPath}/${p.name}`,
      );
      const slug = p.name.slice(0, p.name.length - extension.length);

      const { content, data } = matter(raw);

      const meta = {
        date: data.date,
        title: data.title,
        slug,
      };

      const html = enhancedMarkdownParser(content) as string;

      this.meta.push(meta);
      this.posts.set(slug, html);
    }

    this.ascSortedMeta = this.meta.slice().sort((a, b) =>
      a.date.getTime() - b.date.getTime()
    );
    this.descSortedMeta = this.meta.slice().sort((a, b) =>
      b.date.getTime() - a.date.getTime()
    );
    this.recentMeta = this.descSortedMeta.slice(0, 5);
  }

  getPost(slug: string) {
    return this.posts.get(slug);
  }
}

export const postsCache = new PostsCache();
