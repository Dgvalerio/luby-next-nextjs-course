import { FormEvent } from 'react';

import { NextPage } from 'next';

import classes from './newsletter-registration.module.css';

const NewsletterRegistration: NextPage = () => {
  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
