import { ClientError, ClientErrorOptions, ErrorSchema, Query } from './types';

export const clientErrors = (errorTypes: ClientErrorOptions[]): ErrorSchema => {
  const errors = {} as ClientError;

  errorTypes.forEach((errorType) => {
    errors[errorType.code] = {
      type: 'object',
      description: errorType.description || 'Client error',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
      example: {
        message: errorType.message,
        code: errorType.code,
      },
    };
  });

  return errors;
};

export interface Response {
  description: string;
  content: {
    'application/json': {
      schema: {
        type: string;
        properties: {
          message: { type: string; description: string };
        };
        example: {
          message: string;
        };
      };
    };
  };
}

export const permissionDenied = (): Response => ({
  description: 'Invalid API key',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Permission denied' },
        },
        example: {
          message: 'Permission denied',
        },
      },
    },
  },
});

export const emailQuery = (): Query => ({
  name: 'email',
  in: 'body',
  description: 'User email address',
  required: true,
  schema: {
    type: 'string',
  },
});

export const projectId = (): Query => ({
  name: 'project_id',
  in: 'body',
  description: 'Project ID',
  required: true,
  schema: {
    type: 'string',
  },
});

export const projectIds = (): Query => ({
  name: 'project_ids[]',
  in: 'body',
  description: 'Project IDs ???????????',
  required: true,
  schema: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
});

export const raterDetails = (): Query => ({
  name: 'include_rater_details',
  in: 'query',
  description: 'Include the raters details',
  required: true,
  schema: {
    type: 'boolean',
  },
});
