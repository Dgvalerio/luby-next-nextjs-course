import { FC } from 'react';

import Link from 'next/link';

import classes from './Button.module.css';

const Button: FC<{
  link?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}> = ({ children, link, type = 'button', onClick }) =>
  link ? (
    <Link href={link}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={classes.btn}
    >
      {children}
    </button>
  );

export default Button;
