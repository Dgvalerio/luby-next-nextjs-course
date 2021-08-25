import { IEvent } from '../types/interfaces';

export const apiUrl =
  'https://luby-nextjs-course-default-rtdb.firebaseio.com/evens.json';

export const formatEvents = (
  data: { [s: string]: unknown } | ArrayLike<unknown>
): IEvent[] =>
  Object.entries(data).map(
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

export const getAllEvents: () => Promise<IEvent[]> = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  return formatEvents(data);
};

export const getFeaturedEvents: () => Promise<IEvent[]> = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById: (id) => Promise<IEvent> = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents: (dateFilter) => Promise<IEvent[]> = async (
  dateFilter
) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
