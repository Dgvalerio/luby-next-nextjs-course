export interface IPost {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  isFeatured: boolean;
}

export interface IMessage {
  id: string;
  email: string;
  name: string;
  message: string;
}
