import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import * as Buffer from 'buffer';

export interface IUseMarkdown {
  getHtml: (md: string) => Promise<string | Buffer>;
}

function useMarkdown(): IUseMarkdown {
  const getHtml = async (md: string): Promise<string | Buffer> => {
    return (await unified().use(remarkParse).use(remarkHtml).process(md)).value;
  };

  return {
    getHtml,
  };
}

export default useMarkdown;
