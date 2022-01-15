import {
  clientErrors,
  emailQuery,
  permissionDenied,
  projectId,
  projectIds,
  raterDetails,
} from './utils';

import clientErrorsArray from './clientErrors';

const path = {
  '/assessments/status': {
    post: {
      summary: 'List all assessment tools for users',
      tags: ['Envisia gateway'],
      description: 'Returns raw responses from Envisia',
      requestBody: {
        description: 'Optional description in *Markdown*',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/StatusRequestBody',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Status',
              },
            },
          },
        },
        '400': {
          description: 'Client errors',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/ERRPRJ1' },
                  { $ref: '#/components/schemas/ERRPRJ2' },
                  { $ref: '#/components/schemas/ERRPRJ3' },
                  { $ref: '#/components/schemas/ERRPRJ4' },
                  { $ref: '#/components/schemas/ERRPRJ5' },
                  { $ref: '#/components/schemas/ERRPRJ6' },
                  { $ref: '#/components/schemas/ERRPRJ7' },
                  { $ref: '#/components/schemas/ERRPRJ8' },
                ],
              },
            },
          },
        },
        '500': permissionDenied(),
      },
      security: [{ bearerAuth: [] }],
    },
  },
  '/projects': {
    post: {
      summary: 'List either all projects or specific projects by id',
      tags: ['Envisia gateway'],
      description: 'Send and empty array to return all projects associated',
      requestBody: {
        description: 'Optional description in *Markdown*',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              // optional
              properties: {
                projectIds: {
                  type: 'array',
                  items: { type: 'integer' },
                },
              },
              example: {
                projectIds: ['12345', '56789'],
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Projects',
              },
            },
          },
        },
        '400': {
          description: 'Client errors',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/ERRUSR1' },
                  { $ref: '#/components/schemas/ERRUSR2' },
                  { $ref: '#/components/schemas/ERRUSR3' },
                ],
              },
            },
          },
        },
        '500': permissionDenied(),
      },
      security: [{ bearerAuth: [] }],
    },
  },
  '/raters/status': {
    post: {
      summary: 'Returns the Raters status to users survey tools',
      tags: ['Envisia gateway'],
      description: 'Returns raw responses from Envisia',
      requestBody: {
        description: 'Optional description in *Markdown*',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                projectIds: { type: 'array', items: { type: 'integer' } },
              },
              example: {
                email: 'noddy@toytown.com',
                projectIds: ['1234', 32476],
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RatersStatus',
              },
            },
          },
        },
        '400': {
          description: 'Client errors',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/ERRRTR1' },
                  { $ref: '#/components/schemas/ERRRTR2' },
                  { $ref: '#/components/schemas/ERRRTR3' },
                  { $ref: '#/components/schemas/ERRRTR4' },
                  { $ref: '#/components/schemas/ERRRTR5' },
                ],
              },
            },
          },
        },
        '500': permissionDenied(),
      },
      security: [{ bearerAuth: [] }],
    },
  },
  '/users/generate_otp': {
    post: {
      summary: 'Generate a One Time Password to access reports',
      tags: ['Envisia gateway'],
      description: 'Returns raw responses from Envisia',
      requestBody: {
        description: 'Optional description in *Markdown*',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
              },
              example: {
                email: 'noddy@toytown.com',
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OTP',
              },
            },
          },
        },
        '400': {
          description: 'Client errors',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/ERRUSR1' },
                  { $ref: '#/components/schemas/ERRUSR2' },
                  { $ref: '#/components/schemas/ERRUSR3' },
                ],
              },
            },
          },
        },
        '500': permissionDenied(),
      },
      security: [{ bearerAuth: [] }],
    },
  },
};

const definitions = {
  Assessment: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
      },
      last_name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      assessment_id: {
        description: 'GUID',
        oneOf: [{ type: 'integer' }, { type: 'string' }],
      },
      participant_id: {
        description: 'GUID',
        oneOf: [{ type: 'integer' }, { type: 'string' }],
      },
      project_id: {
        type: 'integer',
      },
      campaign_id: {
        type: 'integer',
      },
      user_id: {
        description: 'GUID',
        oneOf: [{ type: 'integer' }, { type: 'string' }],
      },
      self_assessment_completion_status: {
        type: 'boolean',
      },
      self_assessment_completed_at: {
        type: 'string',
        nullable: true,
      },
      assessment_deadline: {
        type: 'string',
      },
      nomination_deadline: {
        type: 'string',
      },
      total_raters: {
        type: 'integer',
      }, // (excluding self)
      complete_raters: {
        type: 'integer',
      }, // (excluding self),
      incomplete_raters: {
        type: 'integer',
      }, // (excluding self)
      self_assessment_questionnaire_link: {
        type: 'string',
      },
      nomination_link: {
        type: 'string',
      },
      build_report_link: {
        type: 'string',
      },
      raters: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/RaterLite',
        },
      },
    },
  },
  ...clientErrors(clientErrorsArray),
  OTP: {
    type: 'object',
    properties: {
      otp: { type: 'string' },
    },
  },
  Project: {
    type: 'object',
    properties: {
      project_id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      tool_name: {
        type: 'string',
      },
      tool_id: {
        type: 'integer',
      },
      do_not_enforce_nomination_deadline: {
        type: 'boolean',
      },
      do_not_enforce_data_collection_deadline: {
        type: 'boolean',
      },
      status: {
        type: 'string',
      },
    },
  },
  Projects: {
    type: 'object',
    properties: {
      projects: {
        type: 'array',
        items: { $ref: '#/components/schemas/Project' },
      },
      errors: {
        type: 'array',
        items: {
          anyOf: [
            { $ref: '#/components/schemas/ERRPRJ1' },
            { $ref: '#/components/schemas/ERRPRJ2' },
          ],
        },
      },
    },
  },
  Status: {
    type: 'object',
    properties: {
      assessments: {
        type: 'array',
        items: { $ref: '#/components/schemas/Assessment' },
      },
      errors: {
        type: 'array',
        items: {
          anyOf: [
            { $ref: '#/components/schemas/ERRASMT3' },
            { $ref: '#/components/schemas/ERRASMT2' },
          ],
        },
      },
    },
  },
  RaterFull: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
      },
      last_name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      completion_status: {
        type: 'boolean',
      },
      completed_at: {
        type: 'string',
        nullable: true,
      },
      rater_type: {
        type: 'string',
      },

      assessment_deadline: {
        type: 'string',
      },
      assessment_id: {
        description: 'GUID',
        oneOf: [{ type: 'integer' }, { type: 'string' }],
      },
      questionnaire_link: {
        type: 'string',
      },
      participant_first_name: {
        type: 'string',
      },
      participant_last_name: {
        type: 'string',
      },
      participant_id: {
        description: 'GUID',
        oneOf: [{ type: 'integer' }, { type: 'string' }],
      },
      project_name: {
        type: 'string',
      },
      project_id: {
        type: 'integer',
      },
      tool_name: {
        type: 'string',
      },
      tool_id: {
        type: 'integer',
      },
    },
  },
  RaterLite: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
      },
      last_name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      completion_status: {
        type: 'boolean',
      },
      completed_at: {
        type: 'string',
        nullable: true,
      },
      rater_type: {
        type: 'string',
      },
    },
  },
  RatersStatus: {
    type: 'object',
    properties: {
      raters: {
        type: 'array',
        items: { $ref: '#/components/schemas/RaterFull' },
      },
      errors: {
        type: 'array',
        items: {
          anyOf: [
            { $ref: '#/components/schemas/ERRRTR1' },
            { $ref: '#/components/schemas/ERRRTR2' },
            { $ref: '#/components/schemas/ERRRTR3' },
            { $ref: '#/components/schemas/ERRRTR4' },
            { $ref: '#/components/schemas/ERRRTR5' },
          ],
        },
      },
    },
  },
  StatusRequestBody: {
    type: 'object',
    properties: {
      emails: { type: 'array', items: { type: 'string' } },
      projectId: { type: 'string' },
      includeRaterDetails: { type: 'boolean' },
    },
    example: {
      emails: ['noddy@toytown.com', 'busy_bee@hive.com'],
      projectId: '1234567',
      includeRaterDetails: true,
    },
  },
};

export default {
  path,
  definitions,
};
