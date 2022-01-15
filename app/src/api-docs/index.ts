import { OAS3Definition } from 'swagger-jsdoc';
import config from '../lib/configManager';

// Import services api doc files
import Pingz from '../services/pingz/pingz.api-doc';
// import Examples from '../services/Examples/Examples.api-doc';
import Envisia from '../services/Envisia/apiDocs/envisia.api-doc';

export const definition: OAS3Definition = {
  openapi: '3.0.1',
  // definition: {
  info: {
    title: 'Envisia gateway',
    version: '0.1.0',
    description:
      'Gateway that requires calls to be authenticated via Strata Bearer token',
    license: {
      name: 'Private',
    },
    contact: {
      name: 'Dave Clare',
      url: 'https://koala-moon.com',
      email: 'mr.d.clare@gmail.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.hosting.port}`,
      description: 'Local development',
    },
    {
      url: `https://dev-strata2-api.cirrus-connect.com/${config.hosting.serviceName}`,
      description: 'Development environment',
    },
    {
      url: `https://test-strata2-api.cirrus-connect.com/${config.hosting.serviceName}`,
      description: 'Test environment',
    },
    {
      url: `https://strata2-api.cirrus-connect.com/${config.hosting.serviceName}`,
      description: 'Production / Live',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...Envisia.definitions,
    },
  },
  paths: {
    ...Pingz,
    // ...Examples,
    ...Envisia.path,
  },
  // definitions: {
  //   ...Envisia.definitions,
  // },
};
