import { mongoDB } from '../../../helpers/mongo';
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

    const result = await mongoDB.comments.insertOne({
      eventId,
      email,
      name,
      text,
    });

    res
      .status(201)
      .json({ data: { message: 'Added comment.', comment: result } });
  } else if (req.method === 'GET') {
    const result = await mongoDB.comments.find();

    res.status(201).json({ data: { comments: result } });
  }
};

export default handler;
