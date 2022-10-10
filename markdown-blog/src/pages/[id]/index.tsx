import { GetStaticPaths, GetStaticProps } from 'next';
import { PostService } from '@services/postService';
import { Markdown } from '@defines/index';
import Tag from '../../components/tag/tag';
import useMarkdown from '@hooks/useMarkdown';
import { useEffect, useState } from 'react';

export interface IndexProps {
  post: Markdown;
}

function Index(props: IndexProps) {
  const {
    post: {
      attributes: { title, date, tags },
      body,
    },
  } = props;
  const { getHtml } = useMarkdown();
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      setContent(await getHtml(body));
    })();
  }, [body]);

  return (
    <>
      <main>
        <article>
          <h1>{title}</h1>
          <div className={'date'}>{date}</div>
          <div className={'tags'}>
            {tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
          <div className={'content'} dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>

      <style jsx>{`
        article {
          width: 800px;
          margin: 0 auto;
        }

        h1 {
          font-size: 36px;
          font-weight: bold;
          color: #212529;
        }

        .date {
          margin-top: 24px;
          font-size: 14px;
          color: #868e96;
        }

        .tags {
          margin-top: 24px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .content {
          margin-top: 44px;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id || '';
  const post = PostService.getPost(id as string);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = PostService.getPosts();

  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
};

export default Index;
