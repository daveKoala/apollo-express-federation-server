// Apollo Gateway
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import fs from 'fs';

const supergraphSdl = fs.readFileSync('./src/supergraph.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  __exposeQueryPlanExperimental: true,
});

const server = new ApolloServer({
  gateway,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

export default server;
