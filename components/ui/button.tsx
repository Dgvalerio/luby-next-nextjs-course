/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next';
import Link from 'next/link';

import classes from './button.module.css';

const Button: NextPage<{ link?; onClick?; type?: 'button' | 'submit' }> = ({
  link,
  onClick,
  children,
  type,
}) => {
  if (link)
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );

  return (
    <button
      className={classes.btn}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
