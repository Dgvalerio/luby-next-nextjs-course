/* eslint-disable import/prefer-default-export */
import { MongoClient, Document } from 'mongodb';

export const getAllDocuments: (
  client: MongoClient,
  collection: 'comments' | 'newsletter',
  sort,
  filter
) => Promise<Document[]> = async (client, collection, sort, filter = {}) => {
  const db = client.db();
  return db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();
};
