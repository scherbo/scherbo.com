import { extract } from "frontmatter";
import { PostMeta } from "../types.ts";

const postsPath = "posts";
const readPosts = Deno.readDir(postsPath);
const extensionLength = 3;

const postsMeta: PostMeta[] = [];

for await (const p of readPosts) {
  const data = await Deno.readTextFile(`${postsPath}/${p.name}`);

  const meta = extract(data);

  postsMeta.push({
    slug: p.name.slice(0, p.name.length - extensionLength),
    title: meta.attrs.title as string,
    date: meta.attrs.date as Date,
  });
}

postsMeta.sort((a, b) => b.date.getTime() - a.date.getTime());

export const recentPostsMeta = postsMeta.slice(0, 5);
export { postsMeta };
