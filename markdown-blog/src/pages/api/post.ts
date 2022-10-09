// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { PostResponse } from '@models/index';
import fm from 'front-matter';
import { MarkdownAttributes } from '@defines/index';

export default function handler(req: NextApiRequest, res: NextApiResponse<PostResponse>) {
  const {
    query: { id },
  } = req;

  const { attributes, body } = fm<MarkdownAttributes>(fs.readFileSync(`${process.cwd()}/__posts/${id}.md`, 'utf8'));

  res.status(200).json({
    post: { attributes, body },
  });
}
