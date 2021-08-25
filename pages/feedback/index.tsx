import { GetStaticProps, NextPage } from 'next';

import { buildFeedbackPath, extractFeedback, IFeedback } from '../api/feedback';

interface FeedbackPageProps {
  feedbackItems: IFeedback[];
}

const FeedbackPage: NextPage<FeedbackPageProps> = ({ feedbackItems }) => (
  <ul>
    {feedbackItems.map((item) => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps<FeedbackPageProps> = () => {
  const filePath = buildFeedbackPath();
  const feedbackItems = extractFeedback(filePath);

  return {
    props: {
      feedbackItems,
    },
  };
};

export default FeedbackPage;
