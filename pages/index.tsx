import { FormEvent, useRef } from 'react';

import { NextPage } from 'next';

const Home: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;
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
