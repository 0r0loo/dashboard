import { Config } from './configuration';

export const testConfiguration = (): Config => ({
  database: {
    host: ':memory:',
    port: 0,
    username: '',
    password: '',
    database: ':memory:',
  },
  jwt: {
    secret: 'test-jwt-secret-key-for-testing-only',
    expiresIn: '15m',
  },
  app: {
    port: 3001,
    clientUrl: 'http://localhost:3001',
  },
});
