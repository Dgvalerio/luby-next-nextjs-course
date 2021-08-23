import { FC } from 'react';

import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage: FC = () => {
  const allEvents = getAllEvents();

  return (
    <div>
      <EventsSearch />
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventsPage;
