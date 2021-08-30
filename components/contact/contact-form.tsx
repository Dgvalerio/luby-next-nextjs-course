/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';

import { FormEvent, useEffect, useState } from 'react';

import {
  ContactPostRequest,
  ContactPostResponse,
} from '../../pages/api/contact';
import { INotification } from '../../types/interfaces';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContactData = async (contactDetails: ContactPostRequest) => {
  const response = await fetch('api/contact/', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: { 'Content-Type': 'application/json' },
  });
  const data: ContactPostResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.data.message || 'Something went wrong!');
  }
};

const ContactForm: NextPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<
    'pending' | 'success' | 'error'
  >();
  const [requestError, setRequestError] = useState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event: FormEvent) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({ message, name, email });
      setRequestStatus('success');
      setName('');
      setMessage('');
      setEmail('');
    } catch (error) {
      setRequestError(error);
      setRequestStatus('error');
    }
  };

  let notification: INotification;

  if (requestStatus === 'pending')
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  else if (requestStatus === 'success')
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!!!!',
    };
  else if (requestStatus === 'error')
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            rows={5}
            id="message"
            required
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};

export default ContactForm;
