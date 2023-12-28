import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: Pool;

export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(`${process.env.DB_PORT}`),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return client;
};
