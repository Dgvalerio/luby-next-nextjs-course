import { NextPage } from 'next';

import EventItem from './event-item';
import classes from './event-list.module.css';

const EventList: NextPage<{ items }> = ({ items }) => (
  <ul className={classes.list}>
    {items.map((event) => (
      <EventItem
        key={event.id}
        id={event.id}
        title={event.title}
        location={event.location}
        date={event.date}
        image={event.image}
      />
    ))}
  </ul>
);

export default EventList;
