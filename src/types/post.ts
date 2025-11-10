export const PostFields = ['id', 'title', 'blurb', 'body', 'publishedAt', 'updatedDate', 'heroImage', 'heroAlt', 'draft']
export type BaseValues = string | number | boolean;
export type ServerValues = BaseValues | null;
export type ClientValues = BaseValues | undefined;
export type Methods  = "GET" | "POST" | "PUT" | "DELETE";

type Post  = {
  [index: string]: ClientValues | ServerValues;
  id: number;
  title: string;
  blurb: string;
  body: string;
  publishedAt: string;
  updatedDate?: string | null
  heroImage?: string | null; 
  heroAlt?: string | null;
  draft: boolean;
}

export default Post;