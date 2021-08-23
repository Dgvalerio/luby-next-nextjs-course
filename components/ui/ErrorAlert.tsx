import { FC } from 'react';

import classes from './ErrorAlert.module.css';

const ErrorAlert: FC = ({ children }) => (
  <div className={classes.alert}>{children}</div>
);

export default ErrorAlert;
