import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents, IEvent } from '../../helpers/api-utils';

interface AllEventsPageProps {
  events: IEvent[];
}

const AllEventsPage: NextPage<AllEventsPageProps> = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps<AllEventsPageProps> = async () => {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
};

export default AllEventsPage;
