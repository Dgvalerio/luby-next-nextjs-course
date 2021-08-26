import { MongoClient, Document, InsertOneResult } from 'mongodb';

import { CommentPostRequest, NewsletterPostRequest } from '../types/api';
import { IComment } from '../types/interfaces';

export const connectDatabase = async (): Promise<MongoClient> =>
  MongoClient.connect(
    'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/events?retryWrites=true&w=majority'
  );

type IInsertDocument =
  | {
      client: MongoClient;
      collection: 'comments';
      document: CommentPostRequest & { eventId: string };
    }
  | {
      client: MongoClient;
      collection: 'newsletter';
      document: NewsletterPostRequest;
    };

export const insertDocument = async ({
  client,
  collection,
  document,
}: IInsertDocument): Promise<
  | InsertOneResult<CommentPostRequest & { eventId: string }>
  | InsertOneResult<NewsletterPostRequest>
> => {
  const db = await client.db();

  return db.collection(collection).insertOne(document);
};

export const formatComments = (data: Document[]): IComment[] =>
  data.map((item: Document) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: item._id.toString(),
    name: item.name,
    text: item.text,
    eventId: item.eventId,
    email: item.email,
  }));

export const getAllDocuments: (
  client: MongoClient,
  collection: 'comments' | 'newsletter',
  sort,
  filter
) => Promise<Document[]> = async (client, collection, sort, filter = {}) => {
  const db = await client.db();

  return db.collection(collection).find(filter).sort(sort).toArray();
};
