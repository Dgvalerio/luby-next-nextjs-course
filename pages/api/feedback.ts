import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

interface IFeedback {
  id: string;
  email: string;
  text: string;
}
interface FeedbackPOST {
  email: string;
  text: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const { email, text }: FeedbackPOST = req.body;

    const newFeedback: IFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    // sore that in a database or in a file.
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const data: IFeedback[] = JSON.parse(fileData.toString());
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Success!',
      data: {
        feedback: newFeedback,
      },
    });
  } else {
    res.status(200).json({
      message: 'This works!',
    });
  }
};

export default handler;
