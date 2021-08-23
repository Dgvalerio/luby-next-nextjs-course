import { FC } from 'react';

import { getFeaturedEvents } from '../dummy-data';

const HomePage: FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>The Home Page</h1>

      <ul>
        <li>{featuredEvents}</li>
      </ul>
    </div>
  );
};

export default HomePage;
