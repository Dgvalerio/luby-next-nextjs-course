import { mongoDB } from '../../../helpers/mongo';
import {
  ApiHandler,
  ApiHandlerRequest,
  NewsletterPostRequest,
  NewsletterPostResponse,
} from '../../../types/api';

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

    await mongoDB.newsletter.insertOne({ email: userEmail });

    res.status(201).json({ data: { message: 'Signed Up!' } });
  }
};

export default handler;
