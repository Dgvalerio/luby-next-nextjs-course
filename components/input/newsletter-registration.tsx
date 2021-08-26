import { FormEvent, useRef } from 'react';

import { NextPage } from 'next';

import api from '../../helpers/api';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current.value;

    // eslint-disable-next-line no-console
    api.newsletter.create({ email }).then(({ data }) => console.log(data));
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
            ref={emailInputRef}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
