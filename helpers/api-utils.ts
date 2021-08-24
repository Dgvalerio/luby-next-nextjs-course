export const apiUrl =
  'https://luby-nextjs-course-default-rtdb.firebaseio.com/evens.json';

export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export const formatEvents = (data): IEvent[] =>
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

export const getAllEvents = async (): Promise<IEvent[]> => {
  const response = await fetch(apiUrl);

  const data = await response.json();

  return formatEvents(data);
};

export const getFeaturedEvents = async (): Promise<IEvent[]> => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string | string[]): Promise<IEvent> => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const filterEvents = ({
  events,
  year,
  month,
}: {
  events: IEvent[];
  year: number;
  month: number;
}): IEvent[] =>
  events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

export const getFilteredEvents = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<IEvent[]> => {
  const events = await getAllEvents();
  return filterEvents({ events, year, month });
};
