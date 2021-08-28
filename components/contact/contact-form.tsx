/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';

import classes from './contact-form.module.css';

const ContactForm: NextPage = () => (
  <section className={classes.contact}>
    <h1>How can I help you?</h1>
    <form className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="message">Your Message</label>
        <textarea rows={5} id="message" required />
      </div>
      <div className={classes.actions}>
        <button type="submit">Send Message</button>
      </div>
    </form>
  </section>
);

export default ContactForm;
