import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

export interface ChangePasswordPostRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordPostResponse {
  data: {
    message: string;
  };
}

type ChangePasswordApiRequest = ApiHandlerRequest<{
  method: 'PATCH';
  body: ChangePasswordPostRequest;
}>;

type ChangePasswordApiResponse = ChangePasswordPostResponse;

const handler: ApiHandler<ChangePasswordApiRequest, ChangePasswordApiResponse> =
  async (req, res) => {
    if (req.method !== 'PATCH') return;

    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ data: { message: 'Not authenticated!' } });
      return;
    }

    const userEmail = session.user.email;
    const { oldPassword, newPassword } = req.body;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ data: { message: 'User not found!' } });
      client.close();
      return;
    }

    const currentPassword = user.password;

    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordAreEqual) {
      res.status(403).json({ data: { message: 'Invalid password!' } });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );

    client.close();

    res.status(200).json({ data: { message: 'Password updated!' } });
  };

export default handler;
