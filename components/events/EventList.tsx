import { FC } from 'react';

import { IEvent } from '../../dummy-data';
import EventItem from './EventItem';

const EventList: FC<{ items: IEvent[] }> = ({ items }) => (
  <ul>
    {items.map((event) => (
      <EventItem key={event.id} item={event} />
    ))}
  </ul>
);

export default EventList;
