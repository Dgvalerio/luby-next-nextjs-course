/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';

export type ApiHandlerRequest<X = NextApiRequest> = Omit<
  NextApiRequest,
  keyof X
> &
  X;

export type ApiHandler<X = NextApiRequest, Y = any> = (
  req: X,
  res: NextApiResponse<Y>
) => void | Promise<void>;
