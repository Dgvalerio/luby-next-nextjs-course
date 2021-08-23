/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import Layout from '../components/layout/layout';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
