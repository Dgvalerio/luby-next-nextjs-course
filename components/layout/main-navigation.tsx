/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next';
import { signout, useSession } from 'next-auth/client';
import Link from 'next/link';

import classes from './main-navigation.module.css';

const MainNavigation: NextPage = () => {
  const [session] = useSession();

  const logoutHandler = async () => signout();

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
