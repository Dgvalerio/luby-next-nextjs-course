import { FC } from 'react';

import { IEvent } from '../../dummy-data';
import EventItem from './EventItem';
import classes from './EventList.module.css';

const EventList: FC<{ items: IEvent[] }> = ({ items }) => (
  <ul className={classes.list}>
    {items.map((event) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <EventItem key={event.id} {...event} />
    ))}
  </ul>
);

export default EventList;
