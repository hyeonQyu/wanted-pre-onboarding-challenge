export interface MarkdownAttributes {
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string[];
}

export type Markdown = {
  id: string;
  attributes: MarkdownAttributes;
  body: string;
} | null;
