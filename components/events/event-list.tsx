import { NextPage } from 'next';

import { IEvent } from '../../types/interfaces';
import EventItem from './event-item';
import classes from './event-list.module.css';

const EventList: NextPage<{ items: IEvent[] }> = ({ items }) => (
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
