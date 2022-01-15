import { responses } from '../../api-docs/components';

const apiDoc = {
  '/pingz': {
    get: {
      summary: 'Health check a non authenticated end point',
      tags: ['Health Check'],
      description: 'Returns information on the service',
      responses: responses(),
    },
  },
};

export default apiDoc;
