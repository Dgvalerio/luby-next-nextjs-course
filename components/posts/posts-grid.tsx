import { NextPage } from 'next';

import { IPost } from '../../types/interfaces';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

const PostGrid: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <ul className={classes.grid}>
    {posts.map((post) => (
      <PostItem key={post.id} />
    ))}
  </ul>
);

export default PostGrid;
