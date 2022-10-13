import { GetStaticPaths, GetStaticProps } from 'next';
import { PostService } from '@services/postService';
import useMarkdown from '@hooks/useMarkdown';
import { useEffect, useRef, useState } from 'react';
import Tag from '@components/tag/tag';
import Head from 'next/head';
import hljs from 'highlight.js';
import { SwrKey } from '@defines/swrKey';
import { PostResponse } from '../api/post';
import useSwr from 'swr';
import { useRouter } from 'next/router';

export interface IndexProps {
  fallback: {
    [SwrKey.API_POST]: PostResponse;
  };
}

function Index(props: IndexProps) {
  const { fallback } = props;
  const router = useRouter();
  const { query } = router;

  const { data } = useSwr<PostResponse>(
    SwrKey.API_POST,
    async (url) => {
      return (await fetch(`${url}?id=${query.id}`)).json();
    },
    { fallback },
  );

  const {
    post: {
      attributes: { title, date, tags },
      body,
    },
  } = data as PostResponse;

  const { getHtml } = useMarkdown();
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setContent(await getHtml(body));
    })();
  }, [body]);

  useEffect(() => {
    contentRef.current?.querySelectorAll('pre code').forEach((element) => {
      hljs.highlightElement(element as HTMLElement);
    });
  }, [content]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <article>
          <h1>{title}</h1>
          <div className={'date'}>{date}</div>
          <div className={'tags'}>
            {tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
          <div className={'content'} dangerouslySetInnerHTML={{ __html: content }} ref={contentRef} />
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
      fallback: {
        [SwrKey.API_POST]: { post },
      },
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
