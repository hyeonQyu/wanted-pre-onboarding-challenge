import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Markdown } from '@defines/index';
import { PostService } from '@services/postService';

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
  const posts = PostService.getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Index;
