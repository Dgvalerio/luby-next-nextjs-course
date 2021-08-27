import { GetStaticProps, NextPage } from 'next';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import { IPost } from '../../types/interfaces';

interface AllPostsPageProps {
  posts: IPost[];
}

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => (
  <AllPosts posts={posts} />
);

export const getStaticProps: GetStaticProps<AllPostsPageProps> = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
