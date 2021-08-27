import { NextPage } from 'next';

import { DUMMY_POSTS } from '../../../pages';
import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent: NextPage = () => {
  const { slug, image, title, content } = DUMMY_POSTS[0];

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={title} />
      {content}
    </article>
  );
};

export default PostContent;
