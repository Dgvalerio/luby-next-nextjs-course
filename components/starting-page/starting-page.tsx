import { NextPage } from 'next';

import classes from './starting-page.module.css';

const StartingPageContent: NextPage = () => (
  // Show Link to Login page if NOT auth

  <section className={classes.starting}>
    <h1>Welcome on Board!</h1>
  </section>
);

export default StartingPageContent;
