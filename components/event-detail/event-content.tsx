import { NextPage } from 'next';

import classes from './event-content.module.css';

const EventContent: NextPage = ({ children }) => (
  <section className={classes.content}>{children}</section>
);

export default EventContent;
