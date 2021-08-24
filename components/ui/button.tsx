/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next';
import Link from 'next/link';

import classes from './button.module.css';

const Button: NextPage<{ link; onClick? }> = ({ link, onClick, children }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button type="button" className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
