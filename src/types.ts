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

export enum Sort {
  asc = "asc",
  desc = "desc",
}

export type Meta = {
  title: string;
  description: string;
  keywords: string[];
};
