import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@defines/index';
import { PostService } from '@services/postService';

export interface PostsResponse {
  posts: Post[];
}

export default (req: NextApiRequest, res: NextApiResponse<PostsResponse>) => {
  const posts = PostService.getPosts();
  res.status(200).json({ posts });
};
