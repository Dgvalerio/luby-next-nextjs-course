import { NextPage } from 'next';

import ReactMarkdown from 'react-markdown';

import { DUMMY_POSTS } from '../../../pages';
import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent: NextPage = () => {
  const { slug, image, title, content } = DUMMY_POSTS[0];

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={title} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
