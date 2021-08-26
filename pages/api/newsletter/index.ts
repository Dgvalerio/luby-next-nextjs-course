import { MongoClient } from 'mongodb';

import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

export interface INewsletter {
  email: string;
}

export interface NewsletterPostRequest {
  email: string;
}

export interface NewsletterPostResponse {
  data: {
    message: string;
  };
}

type NewsletterApiRequest = ApiHandlerRequest<{
  method: 'POST';
  body: NewsletterPostRequest;
}>;
type NewsletterApiResponse = NewsletterPostResponse;

const handler: ApiHandler<NewsletterApiRequest, NewsletterApiResponse> = async (
  req,
  res
) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ data: { message: 'Invalid email address.' } });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/newsletter?retryWrites=true&w=majority'
    );

    const db = client.db();

    const n: INewsletter = { email: userEmail };

    await db.collection('emails').insertOne(n);

    client.close();

    res.status(201).json({ data: { message: 'Signed Up!' } });
  }
};

export default handler;
