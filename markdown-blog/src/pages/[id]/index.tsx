import { GetStaticPaths, GetStaticProps } from 'next';
import { PostResponse, PostsResponse } from '@models/index';
import { server } from '@env/index';

export interface IndexProps extends PostResponse {
  id: string;
}

function Index(props: IndexProps) {
  const {
    id,
    post: { attributes, body },
  } = props;

  return (
    <>
      <div>
        {id}
        {body}
      </div>

      <style jsx>{``}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id || '';
  const { post }: PostResponse = await (await fetch(`${server}/api/post?id=${id}`)).json();

  return {
    props: {
      id,
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts }: PostsResponse = await (await fetch(`${server}/api/posts`)).json();

  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
};

export default Index;
