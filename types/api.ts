/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export declare type ApiHandlerRequest<X = NextApiRequest> = NextApiRequest & X;

export declare type ApiHandler<X = NextApiRequest, Y = any> = (
  req: ApiHandlerRequest<X>,
  res: NextApiResponse<Y>
) => void | Promise<void>;
