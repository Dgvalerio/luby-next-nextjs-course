/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';

import Layout from '../components/layout/layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
