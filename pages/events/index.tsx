import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
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
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you yo evolve..."
        />
      </Head>
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
