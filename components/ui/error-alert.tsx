import { NextPage } from 'next';

import classes from './error-alert.module.css';

const ErrorAlert: NextPage = ({ children }) => (
  <div className={classes.alert}>{children}</div>
);

export default ErrorAlert;
