import * as fastify from 'fastify';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { AppRouter, appRouter } from './router';
import { createContext } from './context';

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      console.log(`Error in tRPC handler on path ${path} :`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

(async () => {
  try {
    await server.listen({
      port: 3000,
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
})();
