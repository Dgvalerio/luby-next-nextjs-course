export interface IEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface INewsletter {
  _id: string;
  email: string;
}

export interface IComment {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
}
