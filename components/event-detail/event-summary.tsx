import { FC } from 'react';

import classes from './event-summary.module.css';

const EventSummary: FC<{ title: string }> = ({ title }) => (
  <section className={classes.summary}>
    <h1>{title}</h1>
  </section>
);

export default EventSummary;
