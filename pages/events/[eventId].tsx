import { FC } from 'react';

import { useRouter } from 'next/router';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummy-data';

const EventDetailPage: FC = () => {
  const router = useRouter();

  const { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event)
    return (
      <div>
        <h1>No event found!</h1>
      </div>
    );

  const { title, description, date, location, image } = event;
  return (
    <>
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

export default EventDetailPage;
