// Apollo Gateway
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import fs from 'fs';

const supergraphSdl = fs.readFileSync('./src/supergraph.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  __exposeQueryPlanExperimental: true,
  buildService: ({ url }) =>
    new RemoteGraphQLDataSource({
      url,
      willSendRequest: ({ request, context }) => {
        if (context) {
          request.http?.headers.set(
            'authorization',
            (context as { token: string }).token
          );
        }
      },
    }),
});

const server = new ApolloServer({
  gateway,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
  context: ({ req }) => {
    const token = req.headers.authorization || null;
    // Need to validate token. Think about the Bearer / UI token hurdle between running local and in prod
    if (!token) {
      return false;
    }

    return { token };
  },
});

export default server;
