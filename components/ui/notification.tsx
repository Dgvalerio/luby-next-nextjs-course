import { useContext } from 'react';

import { NextPage } from 'next';

import NotificationContext from '../../store/notification-context';
import { INotification } from '../../types/store';
import classes from './notification.module.css';

const Notification: NextPage<INotification> = ({ title, message, status }) => {
  const { hideNotification } = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div
      className={activeClasses}
      onClick={hideNotification}
      onKeyPress={hideNotification}
      role="button"
      tabIndex={0}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
