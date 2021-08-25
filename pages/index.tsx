import { FormEvent, useRef } from 'react';

import { NextPage } from 'next';

import { FeedbackPOST } from './api/feedback';

const Home: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const body: FeedbackPOST = { email, text: feedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log({ data }));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">
            <span>Your Email Address</span>
            <input type="email" id="email" ref={emailInputRef} />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Your Feedback</span>
            <textarea id="feedback" rows={5} ref={feedbackInputRef} />
          </label>
        </div>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default Home;
