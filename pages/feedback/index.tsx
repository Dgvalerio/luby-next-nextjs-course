import { useState } from 'react';

import { GetStaticProps, NextPage } from 'next';

import { buildFeedbackPath, extractFeedback, IFeedback } from '../api/feedback';
import { FeedbackShowResponse } from '../api/feedback/[id]';

interface FeedbackPageProps {
  feedbackItems: IFeedback[];
}

const FeedbackPage: NextPage<FeedbackPageProps> = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState<IFeedback>();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data: FeedbackShowResponse) =>
        setFeedbackData(data.data.feedback)
      );
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={loadFeedbackHandler.bind(null, item.id)}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

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
