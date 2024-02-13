export type PostMeta = {
  slug: string;
  date: Date;
} & Meta;

export type IconProps = {
  width: number;
  height: number;
  classes: string;
};

export enum NavLink {
  home = "home",
  posts = "posts",
}

export type Meta = {
  title: string;
  description: string;
  keywords: string[];
};

export type PostData = {
  meta: PostMeta;
  content: string;
};

export interface IPostsCache {
  getPost(slug: string): Promise<PostData>;

  setPost(slug: string, data: PostData): PostData;

  getPostsMeta(key?: string): Promise<PostMeta[]>;

  setPostsMeta(key: string, data: PostMeta[]): PostMeta[];
}
