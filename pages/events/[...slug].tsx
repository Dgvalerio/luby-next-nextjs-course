/* eslint-disable no-restricted-globals */
import { FC } from 'react';

import { useRouter } from 'next/router';

import EventList from '../../components/events/EventList';
import { getFilteredEvents } from '../../dummy-data';

const FilteredEventsPage: FC = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) return <p className="center">Loading...</p>;

  const year = +filteredData[0];
  const month = +filteredData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  )
    return <p>Invalid filter. Please adjust your values!</p>;

  const events = getFilteredEvents({ year, month });

  if (!filteredData || events.length === 0)
    return <p>No events found for the chosen filter!</p>;
  return <EventList items={events} />;
};

export default FilteredEventsPage;
