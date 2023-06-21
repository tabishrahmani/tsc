import { logger } from "../utils/logger";
interface Config {
  [key: string]: string | number | undefined;
  DB_URL?: string;
  HTTP_PORT: number;
  NODE_ENV: string;
}

const config: Config = {
  /* DATABASE */
  DB_URL: process.env.DB_URL,

  /* SERVER */
  HTTP_PORT: Number(process.env.HTTP_PORT) || 5555,
  NODE_ENV: process.env.NODE_ENV || "development",
};

for (const key in config) {
  if (!config[key]) {
    logger.error(`${key} is either empty or invalid`);
    process.exit(1);
  }
}

export default config;
