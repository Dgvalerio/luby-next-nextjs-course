import { NextPage } from 'next';

import ReactMarkdown from 'react-markdown';

import { IPost } from '../../../types/interfaces';
import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent: NextPage<{ post: IPost }> = ({
  post: { slug, image, title, content },
}) => {
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={title} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
