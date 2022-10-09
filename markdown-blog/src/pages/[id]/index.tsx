import { GetStaticPaths, GetStaticProps } from 'next';
import { PostsResponse } from '@models/index';
import { server } from '@env/index';

export interface IndexProps {
  id: string;
}

function Index(props: IndexProps) {
  const { id } = props;

  return (
    <>
      <div>{id}</div>

      <style jsx>{``}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id || '';

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts }: PostsResponse = await (await fetch(`${server}/api/posts`)).json();

  return {
    paths: posts.map((post) => ({ params: { id: post } })),
    fallback: false,
  };
};

export default Index;
