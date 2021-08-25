import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Comments from '../../components/input/comments';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import { IEvent } from '../../types/interfaces';

interface EventDetailPageProps {
  selectedEvent: IEvent;
}

const EventDetailPage: NextPage<EventDetailPageProps> = (props) => {
  const { selectedEvent: event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (
  context
) => {
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  return {
    props: { selectedEvent: event },
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
