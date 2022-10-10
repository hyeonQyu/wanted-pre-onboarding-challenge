export interface MarkdownAttributes {
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string[];
}

export interface Markdown {
  id: string;
  attributes: MarkdownAttributes;
  body: string;
}