export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface AppConfig {
  port: number;
  clientUrl: string;
}

export interface Config {
  database: DatabaseConfig;
  jwt: JwtConfig;
  app: AppConfig;
}

export default (): Config => ({
  database: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  app: {
    port: parseInt(process.env.API_PORT!, 10) || 3000,
    clientUrl: process.env.VITE_API_URL || 'http://localhost:5173',
  },
});
