/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout/layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <title>Davi Blog</title>
      <meta
        name="description"
        content="I post about programming and web development."
      />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
