import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

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

const handler: ApiHandler<NewsletterApiRequest, NewsletterApiResponse> = (
  req,
  res
) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ data: { message: 'Invalid email address.' } });
      return;
    }

    res.status(201).json({ data: { message: 'Signed Up!' } });
  }
};

export default handler;
