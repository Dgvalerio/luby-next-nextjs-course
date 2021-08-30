import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

export interface SignUpPostRequest {
  email: string;
  password: string;
}

export interface SignUpPostResponse {
  data: {
    message: string;
  };
}

type SignUpApiRequest = ApiHandlerRequest<{
  method: 'POST';
  body: SignUpPostRequest;
}>;

type SignUpApiResponse = SignUpPostResponse;

const handler: ApiHandler<SignUpApiRequest, SignUpApiResponse> = async (
  req,
  res
) => {
  if (req.method !== 'POST') return;

  const { password, email } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      data: {
        message:
          'Invalid input - password should also be at least 7 characters long.',
      },
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const result = db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ data: { message: 'Created user!' } });
};

export default handler;
