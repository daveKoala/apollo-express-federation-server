import { Request, Response } from 'express';
import { client } from '../../lib/azureAppInsights';

export default async (req: Request, res: Response): Promise<void> => {
  res.statusCode = 404;
  client.trackEvent({ name: '404 route note found' });
  res.send("Sorry can't find that!");
};
