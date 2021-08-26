import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

export interface IComment {
  id: string;
  email: string;
  name: string;
  text: string;
}

export interface CommentPostRequest {
  email: string;
  name: string;
  text: string;
}

export interface CommentPostResponse {
  data: {
    message: string;
    comment?: IComment;
  };
}

export interface CommentGetResponse {
  data: {
    comments: IComment[];
  };
}

type CommentApiRequest =
  | ApiHandlerRequest<{
      method: 'POST';
      query: { eventId: string };
      body: CommentPostRequest;
    }>
  | ApiHandlerRequest<{ method: 'GET'; query: { eventId: string } }>;
type CommentApiResponse = CommentPostResponse | CommentGetResponse;

const handler: ApiHandler<CommentApiRequest, CommentApiResponse> = (
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

    const newComment: IComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res
      .status(201)
      .json({ data: { message: 'Added comment.', comment: newComment } });
  } else if (req.method === 'GET') {
    const dummyList: IComment[] = [
      {
        id: 'c1',
        name: 'Max',
        email: 'test@test.com',
        text: 'A first comment!',
      },
      {
        id: 'c2',
        name: 'Manuel',
        email: 'test2@test.com',
        text: 'A second comment!',
      },
    ];

    res.status(201).json({ data: { comments: dummyList } });
  }
};

export default handler;
