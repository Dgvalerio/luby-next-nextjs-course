import { FC } from 'react';

import Link from 'next/link';

import classes from './Button.module.css';

const Button: FC<{ link: string }> = ({ children, link }) => (
  <Link href={link}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a className={classes.btn}>{children}</a>
  </Link>
);

export default Button;
