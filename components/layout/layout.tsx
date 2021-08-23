import { FC } from 'react';

import MainHeader from './main-header';

const Layout: FC = ({ children }) => (
  <>
    <MainHeader />
    <main>{children}</main>
  </>
);

export default Layout;
