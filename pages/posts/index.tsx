import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import { IPost } from '../../types/interfaces';

interface AllPostsPageProps {
  posts: IPost[];
}

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => (
  <>
    <Head>
      <title>All posts</title>
      <meta
        name="description"
        content="A list of all programming-related tutorials and posts."
      />
    </Head>
    <AllPosts posts={posts} />
  </>
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
