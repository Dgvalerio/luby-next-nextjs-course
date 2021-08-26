import { useContext } from 'react';

import { NextPage } from 'next';

import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
import MainHeader from './main-header';

const Layout: NextPage = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
