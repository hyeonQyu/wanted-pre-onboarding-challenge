import { NextApiRequest, NextApiResponse } from 'next';
import { Markdown } from '@defines/index';
import { PostService } from '@services/postService';

export interface PostsResponse {
  posts: Markdown[];
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const posts = PostService.getPosts();
  res.status(200).json({ posts });
};
