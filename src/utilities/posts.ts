import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

import { PostMeta } from "../types.ts";

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

class PostsCache {
  meta: PostMeta[] = []
  posts: Map<string, string> = new Map()

  ascSortedMeta?: PostMeta[]
  descSortedMeta?: PostMeta[]

  recentMeta?: PostMeta[]

  constructor() {
    this.init()
  }

  async init() {
    const postsPath = "posts";
    const readPosts = Deno.readDir(postsPath);
    const extension = ".md";

    for await (const p of readPosts) {
      const rawText = await Deno.readTextFile(`${postsPath}/${p.name}`);
      const slug = p.name.slice(0, p.name.length - extension.length);

      const ast = Markdoc.parse(rawText)
      const content = Markdoc.transform(ast) // TODO: syntax highlighting
      const html = Markdoc.renderers.html(content)

      const meta = {
        ...yaml.load(ast.attributes.frontmatter),
        slug
      }

      this.meta.push(meta)
      this.posts.set(slug, html)
    }
  }

  getPost(slug: string) {
    return this.posts.get(slug)
  }

  getSortedByDateMeta(sort: Sort = Sort.desc) {
    if (sort === Sort.asc) {
      if (this.ascSortedMeta) return this.ascSortedMeta

      this.ascSortedMeta = structuredClone(this.meta) as PostMeta[]
      return this.ascSortedMeta.sort((a, b) => a.date.getTime() - b.date.getTime())
    } else {
      if (this.descSortedMeta) return this.descSortedMeta

      this.descSortedMeta = structuredClone(this.meta) as PostMeta[]
      return this.descSortedMeta.sort((a, b) => b.date.getTime() - a.date.getTime())
    }
  }

  getRecentMeta() {
    if (this.recentMeta) return this.recentMeta
    this.recentMeta = this.getSortedByDateMeta().slice(0, 5)

    return this.recentMeta
  }
}

export const postsCache = new PostsCache()
