/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { IComment } from './interfaces';

export type ApiHandlerRequest<X = NextApiRequest> = Omit<
  NextApiRequest,
  keyof X
> &
  X;

export type ApiHandler<X = NextApiRequest, Y = any> = (
  req: X,
  res: NextApiResponse<Y>
) => void | Promise<void>;

// Events

export interface CommentPostRequest {
  email: string;
  name: string;
  text: string;
}

export interface CommentPostResponse {
  data: {
    message: string;
    comment?: any;
  };
}

export interface CommentGetResponse {
  data: {
    comments: IComment[];
  };
}

// Comments

export interface NewsletterPostRequest {
  email: string;
}

export interface NewsletterPostResponse {
  data: {
    message: string;
  };
}
