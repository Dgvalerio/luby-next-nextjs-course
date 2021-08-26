import { Document, InsertOneResult, MongoClient } from 'mongodb';

import { CommentPostRequest, NewsletterPostRequest } from '../types/api';
import { IComment } from '../types/interfaces';

export const connectDatabase = async (): Promise<MongoClient> =>
  MongoClient.connect(
    'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/events?retryWrites=true&w=majority'
  );

export const mongoDB = {
  newsletter: {
    insertOne: async (
      client: MongoClient,
      data: NewsletterPostRequest
    ): Promise<InsertOneResult<NewsletterPostRequest>> => {
      const db = client.db();

      return db.collection('newsletter').insertOne(data);
    },
  },
  comments: {
    insertOne: async (
      client: MongoClient,
      data: CommentPostRequest & { eventId: string }
    ): Promise<InsertOneResult<CommentPostRequest & { eventId: string }>> => {
      const db = client.db();

      return db.collection('comments').insertOne(data);
    },
    find: async (client: MongoClient, eventId: string): Promise<IComment[]> => {
      const db = client.db();

      const res = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .filter({ eventId })
        .toArray();

      return res.map((item: Document) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: item._id.toString(),
        name: item.name,
        text: item.text,
        eventId: item.eventId,
        email: item.email,
      }));
    },
  },
};
