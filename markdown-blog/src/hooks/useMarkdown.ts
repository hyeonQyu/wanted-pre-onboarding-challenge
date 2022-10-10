import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export interface IUseMarkdown {
  getHtml: (md: string) => Promise<string>;
}

function useMarkdown(): IUseMarkdown {
  const getHtml = async (md: string): Promise<string> => {
    return (await unified().use(remarkParse).use(remarkHtml, { sanitize: false }).process(md)).value.toString();
  };

  return {
    getHtml,
  };
}

export default useMarkdown;
