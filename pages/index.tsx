import { NextPage } from 'next';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

const HomePage: NextPage = () => (
  <>
    <Hero />
    <FeaturedPosts />
  </>
);

export default HomePage;
