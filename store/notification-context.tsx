import { createContext, useEffect, useState } from 'react';

import { NextPage } from 'next';

import { INotification, INotificationContext } from '../types/store';

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: (notificationData: INotification) => null,
  hideNotification: () => null,
});

export const NotificationContextProvider: NextPage = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<INotification>();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => setActiveNotification(null), 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: INotification) =>
    setActiveNotification(notificationData);

  const hideNotificationHandler = () => setActiveNotification(null);

  const context: INotificationContext = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
