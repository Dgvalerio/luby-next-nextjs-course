import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export interface IFeedback {
  id: string;
  email: string;
  text: string;
}

export interface FeedbackPOST {
  email: string;
  text: string;
}

export interface FeedbackGETResponse {
  message: string;
  data: {
    feedbacks: IFeedback[];
  };
}

const buildFeedbackPath = (): string =>
  path.join(process.cwd(), 'data', 'feedback.json');

const extractFeedback = (filePath: string): IFeedback[] => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
};

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const { email, text }: FeedbackPOST = req.body;

    const newFeedback: IFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    // sore that in a database or in a file.
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Success!',
      data: {
        feedback: newFeedback,
      },
    });
  } else {
    const filePath = buildFeedbackPath();
    const feedbacks = extractFeedback(filePath);

    const body: FeedbackGETResponse = {
      message: 'This works!',
      data: {
        feedbacks,
      },
    };

    res.status(200).json(body);
  }
};

export default handler;
