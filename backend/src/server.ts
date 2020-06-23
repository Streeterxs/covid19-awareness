import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import app from './app';
import getCurrentUser from './auth';
import Schema from './schema/Schema';
import { connectDatabase } from './database';

type ConnectionParams = {
    authorization?: string;
  };

(async () => {
  await connectDatabase();
  const server = createServer(app.callback());

  server.listen('3333', () => {
      console.log('O servidor foi iniciado');
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const me = await getCurrentUser(connectionParams.authorization);
        return {
          req: {},
          me
        }
      },
      // eslint-disable-next-line
      onDisconnect: () => console.log('Client subscription disconnected!'),
      execute,
      subscribe,
      schema: Schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
})();