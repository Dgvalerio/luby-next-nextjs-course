import { NextPage } from 'next';

import classes from './featured-posts.module.css';

const FeaturedPosts: NextPage = () => (
  <section className={classes.latest}>
    <h2>Featured Posts</h2>
  </section>
);

export default FeaturedPosts;
