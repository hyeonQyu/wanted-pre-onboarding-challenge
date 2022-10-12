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
      });
  }

  export function getPost(id: string): Markdown {
    try {
      const { attributes, body } = fm<MarkdownAttributes>(fs.readFileSync(`${process.cwd()}/${postsDir}/${id}${mdExtension}`, 'utf8'));
      return { id, attributes, body };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
