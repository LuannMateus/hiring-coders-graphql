import express from 'express';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const startApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: '*',
    },
    bodyParserConfig: true,
  });
};

startApolloServer();

const PORT = process.env.PORT ? process.env.PORT : 8000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`);
});
