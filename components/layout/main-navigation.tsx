/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next';
import Link from 'next/link';

import classes from './main-navigation.module.css';

const MainNavigation: NextPage = () => (
  <header className={classes.header}>
    <Link href="/">
      <a>
        <div className={classes.logo}>Next Auth</div>
      </a>
    </Link>
    <nav>
      <ul>
        <li>
          <Link href="/auth">Login</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <button type="button">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
