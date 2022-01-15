import express, { Request, Response } from 'express';
import { definition } from '../../api-docs';
import swaggerUi from 'swagger-ui-express';

// Middleware
import appInsights from '../../middleware/appInsights';

const router = express.Router();

router.get('/json', appInsights, async (_: Request, res: Response) => {
  res.status(200).send(definition);
});

router.get('/*', appInsights, swaggerUi.serve, swaggerUi.setup(definition));

export default router;
