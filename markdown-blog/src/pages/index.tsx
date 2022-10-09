import { GetStaticProps } from 'next';
import { server } from '@env/index';
import Link from 'next/link';
import { PostsResponse } from '@models/index';
import { Markdown } from '@defines/index';

export interface IndexProps {
  posts: Markdown[];
}

function Index(props: IndexProps) {
  const { posts } = props;

  return (
    <>
      <div>
        <ul>
          {posts.map(({ id, attributes: { title, description, date } }) => (
            <li key={id}>
              <Link href={`/${id}`}>
                <a>{title}</a>
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
