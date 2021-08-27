import { NextPage } from 'next';

import MainNavigation from './main-navigation';

const Layout: NextPage = ({ children }) => (
  <>
    <MainNavigation />
    {children}
  </>
);

export default Layout;
