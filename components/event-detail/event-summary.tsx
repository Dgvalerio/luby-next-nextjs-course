import { NextPage } from 'next';

import classes from './event-summary.module.css';

const EventSummary: NextPage<{ title }> = ({ title }) => (
  <section className={classes.summary}>
    <h1>{title}</h1>
  </section>
);

export default EventSummary;
