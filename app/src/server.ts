import { client } from './lib/azureAppInsights';
import config from './lib/configManager';
import app from './app';

// Middleware
import ErrorHandler from './middleware/errorHandler';
import NotFound from './middleware/notFound';

// Router(s)
import PingzRouter from './services/pingz/pingz.router';
import ApiDocsRouter from './services/ApiDocs/ApiDocs.router';

// Apollo Gateway
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  __exposeQueryPlanExperimental: true,
});

const server = new ApolloServer({
  gateway,
});

app.use('/api-docs', ApiDocsRouter).use('/pingz', PingzRouter);

// Final middleware
app.use(NotFound).use(ErrorHandler);

server.listen().catch((err) => {
  console.error(err);
});

app.listen(config.hosting.port, (): void => {
  console.log(`Success`);
  client.trackEvent({
    name: `start ${config.hosting.serviceName}`,
  });
});
