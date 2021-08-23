import { FC } from 'react';

import { useRouter } from 'next/router';

import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage: FC = () => {
  const router = useRouter();
  const allEvents = getAllEvents();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventsPage;
