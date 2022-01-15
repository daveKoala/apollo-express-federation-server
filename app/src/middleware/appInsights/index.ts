import { client } from '../../lib/azureAppInsights';
import { NextFunction, Request, Response } from 'express';

export default (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  client.commonProperties = {
    'x-request-id': (request.headers['x-request-id'] as string) || 'n/a',
  };
  client.trackNodeHttpRequest({ request, response });
  next();
};
