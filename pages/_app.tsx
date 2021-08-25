/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout/layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <title>Next Events</title>
      <meta name="description" content="NextJS Events" />
      <meta name="viewport" content="initial-scala=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
