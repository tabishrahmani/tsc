import dotenv from "dotenv";
dotenv.config();

interface Config {
  [key: string]: string | number | undefined;
  DB_URL?: string;
  HTTP_PORT?: number;
  NODE_ENV?: string;
}

const config: Config = {
  /* DATABSE */
  DB_URL: process.env.DB_URL,

  /* SERVER */
  HTTP_PORT: Number(process.env.HTTP_PORT) || 5555,
  NODE_ENV: process.env.NODE_ENV || "development",
};

for (const key in config) {
  if (!config[key]) {
    // process.exit(1);
  }
}

export default config;
