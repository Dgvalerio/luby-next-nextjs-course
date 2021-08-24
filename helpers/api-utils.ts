// https://luby-nextjs-course-default-rtdb.firebaseio.com/evens
import { IEvent } from '../dummy-data';

export const getAllEvents = async (): Promise<IEvent[]> => {
  const response = await fetch(
    'https://luby-nextjs-course-default-rtdb.firebaseio.com/evens.json'
  );

  const data = await response.json();

  return Object.entries(data).map(
    ([name, value]: [
      string,
      {
        title: string;
        description: string;
        location: string;
        date: string;
        image: string;
        isFeatured: boolean;
      }
    ]) => ({
      id: name,
      ...value,
    })
  );
};

export const getFeaturedEvents = async (): Promise<IEvent[]> => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};
