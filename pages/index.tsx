import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';
import { IEvent } from '../types/interfaces';

interface HomePageProps {
  events: IEvent[];
}

const HomePage: NextPage<HomePageProps> = ({ events }) => (
  <div>
    <Head>
      <title>NextJS Events</title>
      <meta
        name="description"
        content="Find a lot of great events that allow you to evolve..."
      />
    </Head>
    <NewsletterRegistration />
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
