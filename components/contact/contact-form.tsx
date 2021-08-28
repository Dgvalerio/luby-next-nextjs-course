/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';

import { FormEvent, useState } from 'react';

import { ContactPostRequest } from '../../pages/api/contact';
import classes from './contact-form.module.css';

const ContactForm: NextPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();

    const body: ContactPostRequest = { message, name, email };

    fetch('api/contact/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((response) => console.log({ response }));
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
    </section>
  );
};

export default ContactForm;
