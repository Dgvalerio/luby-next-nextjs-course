import { NextPage } from 'next';

import { IPost } from '../../types/interfaces';
import classes from './all-posts.module.css';
import PostGrid from './posts-grid';

const AllPosts: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <section className={classes.posts}>
    <h1>All posts</h1>
    <PostGrid posts={posts} />
  </section>
);

export default AllPosts;
