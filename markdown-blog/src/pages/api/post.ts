// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import { PostResponse } from '@models/index';
const fm = require('front-matter');

export default function handler(req: NextApiRequest, res: NextApiResponse<PostResponse>) {
  const {
    query: { id },
  } = req;

  const post = fs.readFileSync(`${process.cwd()}/__posts/${id}.md`, 'utf8');

  const { attributes, body } = fm(post);

  res.status(200).json({
    attributes,
    body,
  });
}
