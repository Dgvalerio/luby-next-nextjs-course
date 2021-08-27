import { NextPage } from 'next';
import Image from 'next/image';

import { IPost } from '../../../types/interfaces';
import classes from './post-header.module.css';

const PostHeader: NextPage<Pick<IPost, 'title' | 'image'>> = ({
  title,
  image,
}) => (
  <header className={classes.header}>
    <h1>{title}</h1>
    <Image src={image} alt={title} width={200} height={150} />
  </header>
);

export default PostHeader;
