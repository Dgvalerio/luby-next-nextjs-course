import { GetStaticProps, NextPage } from 'next';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import { IPost } from '../types/interfaces';

interface HomePageProps {
  posts: IPost[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => (
  <>
    <Hero />
    <FeaturedPosts posts={posts} />
  </>
);

export const getStaticProps: GetStaticProps<HomePageProps> = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
