import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
import {
  getEventById,
  getFeaturedEvents,
  IEvent,
} from '../../helpers/api-utils';

interface EventDetailPageProps {
  event: IEvent;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event }) => {
  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );

  const { title, description, date, location, image } = event;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async ({
  params: { eventId },
}) => {
  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default EventDetailPage;
