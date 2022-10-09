// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

type Data = {
  posts: string[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const mdExtension = '.md';

  const posts = fs
    .readdirSync(`${process.cwd()}/__posts`)
    .filter((fileName) => fileName.substring(fileName.length - mdExtension.length) === mdExtension)
    .map((fileName) => fileName.replace(mdExtension, ''));

  res.status(200).json({ posts });
}