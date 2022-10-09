import { GetStaticProps } from 'next';
import { server } from '../env';
import Link from 'next/link';
import { PostsResponse } from '@models/index';

export interface IndexProps {
  posts: string[];
}

function Index(props: IndexProps) {
  const { posts } = props;

  return (
    <>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post}>
              <Link href={`/${post}`}>
                <a>{posts}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{``}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts }: PostsResponse = await (await fetch(`${server}/api/posts`)).json();

  return {
    props: {
      posts,
    },
  };
};

export default Index;
