import { FormEvent, useContext, useRef } from 'react';

import { NextPage } from 'next';

import api from '../../helpers/api';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration: NextPage = () => {
  const { showNotification } = useContext(NotificationContext);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current.value;

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter...',
      status: 'pending',
    });

    api.newsletter
      .create({ email })
      .then(() =>
        showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        })
      )
      .catch((e) =>
        showNotification({
          title: 'Error!',
          message: e.message || 'Something went wrong!',
          status: 'error',
        })
      );
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
