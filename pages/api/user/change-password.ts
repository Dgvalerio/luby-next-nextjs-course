import { getSession } from 'next-auth/client';

import { ApiHandler, ApiHandlerRequest } from '../../../types/api';

export interface ChangePasswordPostRequest {
  password: string;
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
    }
  };

export default handler;
