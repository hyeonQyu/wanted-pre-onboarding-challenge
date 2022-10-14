export interface PostAttributes {
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string[];
}

export interface Post {
  id: string;
  attributes: PostAttributes;
  body: string;
}
