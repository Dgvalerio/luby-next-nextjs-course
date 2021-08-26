import { createContext, useState } from 'react';

import { NextPage } from 'next';

import { INotification, INotificationContext } from '../types/store';

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: (notificationData: INotification) => null,
  hideNotification: () => null,
});

export const NotificationContextProvider: NextPage = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<INotification>();

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
