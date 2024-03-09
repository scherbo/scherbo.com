import { PostMeta } from "../types.ts";

export function extendPostMeta(
  // deno-lint-ignore no-explicit-any
  data: { [key: string]: any },
  slug: string,
): PostMeta {
  return {
    date: data.date,
    title: data.title ?? "",
    description: data.description ?? "",
    keywords: data.keywords ?? [],
    slug,
    postImageCredit: data.postImageCredit ?? "",
    postImageLink: data.postImageLink ?? "",
    postImagePlug: data.postImagePlug ?? "",
  };
}
