/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { FC } from 'react';

import { AppProps } from 'next/app';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
