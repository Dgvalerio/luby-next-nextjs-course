import { FC } from 'react';

import classes from './event-content.module.css';

const EventContent: FC = ({ children }) => (
  <section className={classes.content}>{children}</section>
);

export default EventContent;
