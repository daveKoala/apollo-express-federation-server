import { client } from './lib/azureAppInsights';
import config from './lib/configManager';
import app from './app';

// Middleware
import ErrorHandler from './middleware/errorHandler';
import NotFound from './middleware/notFound';

// Router(s)
import PingzRouter from './services/pingz/pingz.router';
import ApiDocsRouter from './services/ApiDocs/ApiDocs.router';

import server from './lib/graph';

app.use('/api-docs', ApiDocsRouter).use('/pingz', PingzRouter);

server
  .start()
  .then(() => {
    console.log('started server');

    server.applyMiddleware({ app });

    // Final middleware
    app.use(NotFound).use(ErrorHandler);

    app.listen({ port: config.hosting.port }, () => {
      console.log(
        `Now browse to http://localhost:${config.hosting.port}` +
          server.graphqlPath
      );
      client.trackEvent({
        name: 'start service',
      });
    });
    return null;
  })
  .catch((error) => {
    console.log('error server: ', error);
  });
