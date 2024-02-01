export type PostMeta = {
  slug: string;
  title: string;
  date: Date;
};

export type IconProps = {
  width: number
  height: number
  classes: string
}

export enum NavLink {
  home = 'home',
  posts = 'posts',
}