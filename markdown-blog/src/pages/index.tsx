import { GetStaticProps } from 'next';
import Link from 'next/link';
import { PostService } from '@services/postService';
import PostPreview from '@components/post-preview/postPreview';
import Head from 'next/head';
import useSwr, { SWRConfig } from 'swr';
import { PostsResponse } from './api/posts';
import { SwrKey } from '@defines/swrKey';

export interface IndexProps {
  fallback: {
    [SwrKey.API_POSTS]: PostsResponse;
  };
}

function Index(props: IndexProps) {
  const { fallback } = props;
  const { data } = useSwr<PostsResponse>(
    SwrKey.API_POSTS,
    async (url) => {
      return (await fetch(url)).json();
    },
    { fallback },
  );

  const posts = data?.posts || [];

  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Head>
          <title>글 목록</title>
        </Head>

        <main>
          <h1>글 목록</h1>
          <ul>
            {posts.map(({ id, attributes }) => (
              <li key={id}>
                <Link href={`/${id}`}>
                  <a>
                    <PostPreview attributes={attributes} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </SWRConfig>

      <style jsx>{`
        h1 {
          font-size: 36px;
          font-weight: bold;
          color: #212529;
          text-align: center;
          margin: 0;
        }

        ul {
          width: fit-content;
          margin: 54px auto 0;
        }

        li {
          list-style: none;
        }

        a {
          text-decoration: none;
        }
        a:active {
          color: inherit;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = PostService.getPosts();

  return {
    props: {
      fallback: {
        [SwrKey.API_POSTS]: { posts },
      },
    },
  };
};

export default Index;
