import { Markdown, MarkdownAttributes } from '@defines/index';
import fs from 'fs';
import fm from 'front-matter';

export namespace PostService {
  const mdExtension = '.md';

  export function getPosts(): Markdown[] {
    return fs
      .readdirSync(`${process.cwd()}/__posts`)
      .filter((fileName) => fileName.substring(fileName.length - mdExtension.length) === mdExtension)
      .map((fileName) => {
        const id = fileName.replace(mdExtension, '');
        return getPost(id);
      });
  }

  export function getPost(id: string): Markdown {
    const { attributes, body } = fm<MarkdownAttributes>(fs.readFileSync(`${process.cwd()}/__posts/${id}${mdExtension}`, 'utf8'));
    return { id, attributes, body };
  }
}