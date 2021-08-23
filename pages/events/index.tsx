import { FC } from 'react';

import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage: FC = () => {
  const allEvents = getAllEvents();

  return (
    <div>
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventsPage;
