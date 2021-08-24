import { GetStaticProps, NextPage } from 'next';

import EventList from '../components/events/event-list';
import { IEvent } from '../dummy-data';
import { getFeaturedEvents } from '../helpers/api-utils';

interface HomePageProps {
  events: IEvent[];
}

const HomePage: NextPage<HomePageProps> = ({ events }) => (
  <div>
    <EventList items={events} />
  </div>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
};

export default HomePage;
