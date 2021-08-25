import { NextPage } from 'next';

import MainHeader from './main-header';

const Layout: NextPage = ({ children }) => (
  <>
    <MainHeader />
    <main>{children}</main>
  </>
);

export default Layout;
