import { GetStaticPaths, GetStaticProps } from 'next';
import { PostService } from '@services/postService';
import useMarkdown from '@hooks/useMarkdown';
import { useEffect, useRef, useState } from 'react';
import Tag from '@components/tag/tag';
import Head from 'next/head';
import hljs from 'highlight.js';
import { SwrKey } from '@defines/swrKey';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { PostResponse } from '@api/post';
import Loading from '@components/loading/loading';
import { HEADER_HEIGHT } from '@defines/index';

export interface IndexProps {
  fallback: {
    [SwrKey.API_POST]: PostResponse;
  };
}

function Index(props: IndexProps) {
  const { fallback } = props;
  const router = useRouter();
  const { query } = router;

  const { data, isValidating } = useSwr<PostResponse>(
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
        {isValidating ? (
          <div className={'loading-wrapper'}>
            <Loading size={50} />
          </div>
        ) : (
          <article>
            <h2 className={'title'}>{title}</h2>
            <div className={'date'}>{date}</div>
            <div className={'tags'}>
              {tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </div>
            <div className={'content'} dangerouslySetInnerHTML={{ __html: content }} ref={contentRef} />
          </article>
        )}
      </main>

      <style jsx>{`
        main {
          height: calc(100% - ${HEADER_HEIGHT}px);
        }

        .loading-wrapper {
          width: 800px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        article {
          width: 800px;
          margin: 0 auto;
        }

        article :global(h1) {
          display: block;
          font-size: 2em;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          margin-inline-start: 0;
          margin-inline-end: 0;
          font-weight: bold;
        }

        h2.title {
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
