import { Markdown } from '@defines/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { PostService } from '@services/postService';

export interface PostResponse {
  post: Markdown;
}

export default (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const post = PostService.getPost(id);
  res.status(200).json({ post });
};
