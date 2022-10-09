// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { PostsResponse } from '@models/index';
import fm from 'front-matter';
import { Markdown, MarkdownAttributes } from '@defines/index';

export default function handler(req: NextApiRequest, res: NextApiResponse<PostsResponse>) {
  const mdExtension = '.md';

  const posts: Markdown[] = fs
    .readdirSync(`${process.cwd()}/__posts`)
    .filter((fileName) => fileName.substring(fileName.length - mdExtension.length) === mdExtension)
    .map((fileName) => {
      const id = fileName.replace(mdExtension, '');
      const { attributes, body } = fm<MarkdownAttributes>(fs.readFileSync(`${process.cwd()}/__posts/${id}${mdExtension}`, 'utf8'));
      return { id, attributes, body };
    });

  res.status(200).json({ posts });
}
