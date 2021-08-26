export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface INewsletter {
  id: string;
  email: string;
}

export interface IComment {
  id: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
}
