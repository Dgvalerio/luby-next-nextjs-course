// import { useContext } from 'react';

import { NextPage } from 'next';

// import NotificationContext from '../../store/notification-context';
import classes from './notification.module.css';

const Notification: NextPage<{
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}> = ({ title, message, status }) => {
  // const notificationCtx = useContext(NotificationContext);

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    // <div className={activeClasses} onClick={notificationCtx.hideNotification}>
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
