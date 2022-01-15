import { Responses } from 'swagger-jsdoc';

export const responses = (): Responses => {
  return {
    '200': {
      description: 'Ok',
      content: {
        'text/plain': {
          schema: {
            type: 'string',
            example: 'ok',
          },
        },
      },
    },
  };
};

export const responseNotAuthE = (): Responses => {
  return {
    '404': {
      description: 'Ok',
      content: {
        'text/plain': {
          schema: {
            type: 'string',
            example: 'ok',
          },
        },
      },
    },
  };
};

export const security = [{ bearerAuth: [] }];
