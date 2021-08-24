/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import {
  apiUrl,
  filterEvents,
  formatEvents,
  IEvent,
} from '../../helpers/api-utils';

const FilteredEventsPage: NextPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<IEvent[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(apiUrl);

  useEffect(() => {
    if (data) setLoadedEvents(formatEvents(data));
  }, [data]);

  if (!loadedEvents) return <p className="center">Loading...</p>;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  )
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const filteredEvents = filterEvents({
    events: loadedEvents,
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
