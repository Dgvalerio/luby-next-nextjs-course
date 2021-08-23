import { FC } from 'react';

import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';

const HomePage: FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>The Home Page</h1>

      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
