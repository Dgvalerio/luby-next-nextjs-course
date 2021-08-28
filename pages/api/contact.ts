import { MongoClient } from 'mongodb';

import { ApiHandler, ApiHandlerRequest } from '../../types/api';
import { IMessage } from '../../types/interfaces';

export interface ContactPostRequest {
  email: string;
  name: string;
  message: string;
}

export interface ContactPostResponse {
  data: {
    message: string;
    data?: IMessage;
  };
}

type ContactApiRequest = ApiHandlerRequest<{
  method: 'POST';
  body: ContactPostRequest;
}>;

type ContactApiResponse = ContactPostResponse;

const handler: ApiHandler<ContactApiRequest, ContactApiResponse> = async (
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

    const newMessage = { email, message, name };

    let client;

    try {
      client = await MongoClient.connect(
        'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/my-site?retryWrites=true&w=majority'
      );
    } catch (error) {
      res
        .status(500)
        .json({ data: { message: 'Could not connect to database.' } });
      return;
    }

    const db = client.db();

    let result;

    try {
      result = await db.collection('messages').insertOne(newMessage);
    } catch (error) {
      client.close();
      res.status(500).json({ data: { message: 'Storing message failed!' } });
      return;
    }

    client.close();

    res.status(201).json({
      data: {
        message: 'Successfully stored message!',
        data: { id: result.insertedId, ...newMessage },
      },
    });
  }
};

export default handler;
