import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, resp: Response) => {
  resp.status(200).send('ok');
});

export default router;
