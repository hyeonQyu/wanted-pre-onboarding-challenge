import { Markdown, MarkdownAttributes } from '@defines/index';
import fs from 'fs';
import fm from 'front-matter';

export namespace PostService {
  const mdExtension = '.md';
  const postsDir = '__posts';

  export function getPosts(): Markdown[] {
    return fs
      .readdirSync(`${process.cwd()}/${postsDir}`)
      .filter((fileName) => fileName.substring(fileName.length - mdExtension.length) === mdExtension)
      .map((fileName) => {
        const id = fileName.replace(mdExtension, '');
        return getPost(id);
      })
      .sort(({ attributes: { date: a } }, { attributes: { date: b } }) => {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      });
  }

  export function getPost(id: string): Markdown {
    const { attributes, body } = fm<MarkdownAttributes>(fs.readFileSync(`${process.cwd()}/${postsDir}/${id}${mdExtension}`, 'utf8'));
    return { id, attributes, body };
  }
}
