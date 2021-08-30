import { NextPage } from 'next';

import MainNavigation from './main-navigation';

const Layout: NextPage = ({ children }) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
);

export default Layout;
