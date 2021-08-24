/* eslint-disable no-restricted-globals */
import { GetServerSideProps, NextPage } from 'next';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents, IEvent } from '../../helpers/api-utils';

interface FilteredEventsPageProps {
  events?: IEvent[];
  date?: {
    year: number;
    month: number;
  };
  hasError?: boolean;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({
  events,
  hasError,
  date: dateProp,
}) => {
  if (hasError)
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

  const filteredEvents = events;

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

  const date = new Date(dateProp.year, dateProp.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FilteredEventsPageProps> =
  async ({ params: { slug: filterData } }) => {
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
      numMonth > 12
    )
      return {
        props: {
          hasError: true,
        },
      };

    const events = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    return { props: { events, date: { year: numYear, month: numMonth } } };
  };

export default FilteredEventsPage;
