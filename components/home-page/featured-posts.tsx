import { NextPage } from 'next';

import { IPost } from '../../types/interfaces';
import PostGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

const FeaturedPosts: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <section className={classes.latest}>
    <h2>Featured Posts</h2>
    <PostGrid posts={posts} />
  </section>
);

export default FeaturedPosts;
