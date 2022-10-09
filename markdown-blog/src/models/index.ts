import { MarkdownAttributes } from '@defines/index';

export interface PostsResponse {
  posts: string[];
}

export interface PostResponse {
  attributes: MarkdownAttributes;
  body: string;
}
