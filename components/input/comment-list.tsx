import { NextPage } from 'next';

import { IComment } from '../../types/interfaces';
import classes from './comment-list.module.css';

const CommentList: NextPage<{ items: IComment[] }> = ({ items }) => (
  <ul className={classes.comments}>
    {items.map((item) => (
      <li key={item.id}>
        <p>{item.text}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
    ))}
  </ul>
);

export default CommentList;
