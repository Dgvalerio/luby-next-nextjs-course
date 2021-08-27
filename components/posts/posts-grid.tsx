import { NextPage } from 'next';

import { IPost } from '../../types/interfaces';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

const PostGrid: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <ul className={classes.grid}>
    {posts.map((post) => (
      <PostItem key={post.slug} post={post} />
    ))}
  </ul>
);

export default PostGrid;
