export interface ClientErrorOptions {
  message: string;
  code: string;
  description?: string;
}

export interface ClientErrorBody {
  message: { type: string };
  code: { type: string };
  description?: string;
}

export interface ClientError {
  [key: string]: {
    type: string;
    description?: string;
    properties: ClientErrorBody;
    example?: {
      [ket: string]: string | number | null;
    };
  };
}

export interface ErrorSchema {
  [key: string]: {
    type: string;
    description?: string;
    properties: {
      message: { type: string };
      code: { type: string };
    };
  };
}

export interface Query {
  name: string;
  in: string;
  description: string;
  required?: boolean;
  schema: {
    type: string;
    items?: {
      type: string;
    };
  };
}
