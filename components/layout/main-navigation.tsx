import { NextPage } from 'next';
import Link from 'next/link';

import Logo from './logo';

const MainNavigation: NextPage = () => (
  <header>
    <Link href="/" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Logo />
      </a>
    </Link>

    <nav>
      <ul>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
