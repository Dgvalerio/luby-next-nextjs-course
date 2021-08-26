import { InsertOneResult, MongoClient } from 'mongodb';

import { CommentPostRequest, NewsletterPostRequest } from '../types/api';
import { IComment } from '../types/interfaces';

export const mongoConnect = async (): Promise<MongoClient> =>
  MongoClient.connect(
    'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/events?retryWrites=true&w=majority'
  );

export const mongoDB = {
  newsletter: {
    insertOne: async (
      data: NewsletterPostRequest
    ): Promise<InsertOneResult<NewsletterPostRequest>> => {
      const client = await mongoConnect();

      const db = client.db();

      const res = await db.collection('newsletter').insertOne(data);

      client.close();

      return res;
    },
  },
  comments: {
    insertOne: async (
      data: CommentPostRequest & { eventId: string }
    ): Promise<InsertOneResult<CommentPostRequest & { eventId: string }>> => {
      const client = await mongoConnect();

      const db = client.db();

      const res = await db.collection('comments').insertOne(data);

      client.close();

      return res;
    },
    find: async (): Promise<IComment[]> => {
      const client = await mongoConnect();

      const db = client.db();

      const res = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .toArray();

      client.close();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res;
    },
  },
};
