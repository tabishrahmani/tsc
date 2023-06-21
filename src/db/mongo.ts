import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config";
import { logger } from "../utils/logger";
import { DB_CONNECTION_STATES } from "../config/constants";

export default async function connectDb(): Promise<void> {
  const connectionOptions: ConnectOptions = {
    dbName: "feature_test",
    retryWrites: true,
    w: "majority",
  };
  const connection = mongoose.connection;

  connection.on("connected", function (): void {
    logger.info("Database connection successful");
  });

  connection.on("disconnected", (): void => {
    logger.info("Database disconnected");
  });

  connection.on("error", (error: Error): void => {
    logger.error(`DB connection error: ${JSON.stringify(error.message)}`);
  });

  try {
    if (config.DB_URL) {
      mongoose.set("debug", true);
      await mongoose.connect(config.DB_URL, connectionOptions);
    }
  } catch (error) {
    logger.error(`Error while connecting to DB: ${JSON.stringify(error)}`);
  }
}

export async function disconnectDb(): Promise<void> {
  const connectionState: number = mongoose.connection.readyState;

  if (connectionState === DB_CONNECTION_STATES.CONNECTED) {
    await mongoose.connection.close();
    logger.info("Connection closed successfully");
  }
}
