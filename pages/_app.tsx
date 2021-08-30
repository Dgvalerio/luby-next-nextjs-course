/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { NextPage } from 'next';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';

import Layout from '../components/layout/layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
