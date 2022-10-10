import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Markdown } from '@defines/index';
import { PostService } from '@services/postService';
import PostPreview from '@components/post-preview/postPreview';

export interface IndexProps {
  posts: Markdown[];
}

function Index(props: IndexProps) {
  const { posts } = props;

  return (
    <>
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
      posts,
    },
  };
};

export default Index;
