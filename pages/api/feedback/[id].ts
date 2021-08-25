import { NextApiRequest, NextApiResponse } from 'next';

import { buildFeedbackPath, extractFeedback, IFeedback } from '../feedback';

interface Req extends NextApiRequest {
  query: {
    id: string;
  };
}

export interface FeedbackShowResponse {
  data: {
    feedback: IFeedback;
  };
}

const handler = (
  req: Req,
  res: NextApiResponse<FeedbackShowResponse>
): void => {
  const feedbackId = req.query.id;

  const filePath = buildFeedbackPath();
  const feedbacksData = extractFeedback(filePath);

  const selectedFeedback = feedbacksData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({
    data: {
      feedback: selectedFeedback,
    },
  });
};

export default handler;
