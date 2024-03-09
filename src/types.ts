export type Route = {
  params: Record<string, string>;
  query: Record<string, string>;
  path: string;
};

export type Context = {
  route: Route;
};

export type PostMeta = {
  slug: string;
  date: Date;
  postImageCredit: string;
  postImageLink: string;
  postImagePlug: string;
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

export enum ErrorMessages {
  postNotFound = "Post not found",
  postsMetaNotFound = "Posts meta not found",
  unknown = "Unknown error",
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
}

export interface IPostsMetaCache {
  getPostsMeta(key?: string): Promise<PostMeta[]>;
  setPostsMeta(key: string, data: PostMeta[]): PostMeta[];
}
