// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER)
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'dgvalerio',
        mongodb_password: 'eRY1RrtpOPm8xxfQ',
        mongodb_cluster: 'cluster0',
        mongodb_database: 'my-site-dev',
      },
    };

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'dgvalerio',
      mongodb_password: 'eRY1RrtpOPm8xxfQ',
      mongodb_cluster: 'cluster0',
      mongodb_database: 'my-site',
    },
  };
};

module.exports = nextConfig;
