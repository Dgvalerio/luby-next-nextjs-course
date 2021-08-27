import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { IPost } from '../../types/interfaces';
import classes from './post-item.module.css';

const PostItem: NextPage<{ post: IPost }> = ({
  post: { excerpt, image, title, date, slug },
}) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={slug} passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
