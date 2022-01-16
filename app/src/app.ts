import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import ignoreFavIcon from './middleware/ignoreFavIcon';
import morgan from 'morgan';

const app: Application = express();

app
  .use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    })
  )
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(ignoreFavIcon)
  .use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      skip: (req) => {
        if (
          ['/graphql'].some(
            (subString) => subString.toLowerCase() === req.originalUrl?.toLowerCase()
          )
        ) {
          return true;
        } else {
          return false;
        }
      },
    })
  );

export default app;
