import { GetStaticProps, NextPage } from 'next';

import EventList from '../components/events/event-list';
import { getFeaturedEvents, IEvent } from '../helpers/api-utils';

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
    revalidate: 1800,
  };
};

export default HomePage;
