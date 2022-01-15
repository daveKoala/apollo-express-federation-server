import { Configuration } from './types';

const config: Configuration = {
  hosting: {
    port: Number(process.env.PORT) || 8080,
    host: process.env.HOSTING_HOST || 'localhost',
    serviceName: process.env.HOSTING_SERVICE_NAME || 'node-service',
  },
  insights: {
    instrumentationKey: process.env.APP_INSIGHTS_KEY || '',
    cloudRole: process.env.APP_INSIGHTS_ROLE || '',
  },
};

export default config;
