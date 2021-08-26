import { connectDatabase, mongoDB } from '../../../helpers/mongo';
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

    const client = await connectDatabase();

    const result = await mongoDB.comments.insertOne(client, {
      eventId,
      email,
      name,
      text,
    });

    client.close();

    res
      .status(201)
      .json({ data: { message: 'Added comment.', comment: result } });
  } else if (req.method === 'GET') {
    const client = await connectDatabase();

    const result = await mongoDB.comments.find(client, eventId);

    client.close();

    res.status(201).json({ data: { comments: result } });
  }
};

export default handler;
