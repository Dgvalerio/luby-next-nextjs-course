import { NextPage } from 'next';

import ReactDOM from 'react-dom';

import { INotification } from '../../types/interfaces';
import classes from './notification.module.css';

const Notification: NextPage<INotification> = ({ title, message, status }) => {
  let statusClasses = '';

  if (status === 'success') statusClasses = classes.success;

  if (status === 'error') statusClasses = classes.error;

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications')
  );
};

export default Notification;
