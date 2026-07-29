export type TPost = {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
  slug?: string;
};

export type TPostTeaser = Pick<
  TPost,
  "title" | "slug" | "createdAt" | "teaser"
>;
