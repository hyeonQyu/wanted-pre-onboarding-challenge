import { Post, PostAttributes } from '@defines/index';
import fs from 'fs';
import fm from 'front-matter';

export namespace PostService {
  let posts: Post[] = [];
  const mdExtension = '.md';
  const postsDir = '__posts';

  export function getPosts(): Post[] {
    posts = fs.readdirSync(`${process.cwd()}/${postsDir}`).filter(isMarkdownFile).map(getPostFromFileName).sort(comparePostsByDateDesc);
    return posts;
  }

  export function getPost(id: string): Post {
    const { attributes, body } = fm<PostAttributes>(fs.readFileSync(`${process.cwd()}/${postsDir}/${id}${mdExtension}`, 'utf8'));
    return { id, attributes, body };
  }

  function isMarkdownFile(fileName: string) {
    return fileName.substring(fileName.length - mdExtension.length) === mdExtension;
  }

  function getPostFromFileName(fileName: string) {
    const id = fileName.replace(mdExtension, '');
    return getPost(id);
  }

  function comparePostsByDateDesc(post1: Post, post2: Post) {
    const {
      attributes: { date: date1 },
    } = post1;
    const {
      attributes: { date: date2 },
    } = post2;
    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    }
    return 0;
  }
}
