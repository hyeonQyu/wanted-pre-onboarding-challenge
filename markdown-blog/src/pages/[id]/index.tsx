import { GetStaticPaths, GetStaticProps } from 'next';
import { PostService } from '@services/postService';
import { Markdown } from '@defines/index';

export interface IndexProps extends Markdown {
  id: string;
}

function Index(props: IndexProps) {
  const { id, attributes, body } = props;

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
  const post = PostService.getPost(id as string);

  return {
    props: {
      id,
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
