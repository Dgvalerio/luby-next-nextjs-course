import { MongoClient } from 'mongodb';

import {
  connectDatabase,
  formatComments,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';
import {
  ApiHandler,
  ApiHandlerRequest,
  CommentGetResponse,
  CommentPostRequest,
  CommentPostResponse,
} from '../../../types/api';

type CommentApiRequest =
  | ApiHandlerRequest<{
      method: 'POST';
      query: { eventId: string };
      body: CommentPostRequest;
    }>
  | ApiHandlerRequest<{ method: 'GET'; query: { eventId: string } }>;

type CommentApiResponse = CommentPostResponse | CommentGetResponse;

const handler: ApiHandler<CommentApiRequest, CommentApiResponse> = async (
  req,
  res
) => {
  const { eventId } = req.query;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ data: { message: 'Invalid input.' } });
      return;
    }

    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (e) {
      res
        .status(500)
        .json({ data: { message: 'Connecting to the database failed!' } });
      return;
    }

    let result;

    try {
      result = await insertDocument({
        client,
        collection: 'comments',
        document: {
          eventId,
          email,
          name,
          text,
        },
      });

      res
        .status(201)
        .json({ data: { message: 'Added comment.', comment: result } });
    } catch (e) {
      res.status(500).json({ data: { message: 'Inserting comment failed!' } });
    } finally {
      client.close();
    }
  } else if (req.method === 'GET') {
    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (e) {
      res
        .status(500)
        .json({ data: { message: 'Connecting to the database failed!' } });
      return;
    }

    let result;

    try {
      result = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );

      res.status(201).json({ data: { comments: formatComments(result) } });
    } catch (e) {
      res.status(500).json({ data: { message: 'Getting comments failed!' } });
    } finally {
      client.close();
    }
  }
};

export default handler;
