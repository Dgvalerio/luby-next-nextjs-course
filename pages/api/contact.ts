import { ApiHandler, ApiHandlerRequest } from '../../types/api';

interface ContactPostRequest {
  email: string;
  name: string;
  message: string;
}

interface ContactPostResponse {
  data: {
    message: string;
    data?: ContactPostRequest;
  };
}

type ContactApiRequest = ApiHandlerRequest<{
  method: 'POST';
  body: ContactPostRequest;
}>;

type ContactApiResponse = ContactPostResponse;

const handler: ApiHandler<ContactApiRequest, ContactApiResponse> = (
  req,
  res
) => {
  if (req.method === 'POST') {
    const { email, message, name } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !message ||
      message.trim() === '' ||
      !name ||
      name.trim() === ''
    ) {
      res.status(422).json({
        data: {
          message: 'Invalid input.',
        },
      });
      return;
    }

    // Store
    const newMessage = { email, message, name };

    res.status(201).json({
      data: { message: 'Successfully stored message!', data: newMessage },
    });
  }
};

export default handler;
