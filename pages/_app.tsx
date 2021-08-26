/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <NotificationContextProvider>
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </NotificationContextProvider>
);

export default MyApp;
