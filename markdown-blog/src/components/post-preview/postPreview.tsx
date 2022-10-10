import { MarkdownAttributes } from '@defines/index';
import Tag from '@components/tag/tag';

export interface PostPreviewProps {
  attributes: MarkdownAttributes;
}

function PostPreview(props: PostPreviewProps) {
  const {
    attributes: { title, description, date, tags },
  } = props;

  return (
    <>
      <div className={'preview'}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={'tags'}>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <div className={'date'}>{date}</div>
      </div>

      <style jsx>{`
        .preview {
          padding: 32px 24px 24px;
          width: 800px;
          border-radius: 20px;
          position: relative;
          top: 0;
          transition: 0.2s;
        }
        .preview:hover {
          top: -5px;
          box-shadow: 0 15px 20px lightgray;
        }

        h2 {
          color: #212529;
          font-size: 24px;
          font-weight: bold;
        }

        p {
          color: #495057;
          font-size: 16px;
          margin-top: 14px;
        }

        .tags {
          margin-top: 32px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .date {
          margin-top: 14px;
          font-size: 14px;
          color: #868e96;
          text-align: right;
        }
      `}</style>
    </>
  );
}

export default PostPreview;
