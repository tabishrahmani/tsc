import dotenv from "dotenv";
dotenv.config();
import { config } from "./config";
import express, { NextFunction, Request, Response, Express } from "express";
import http, { Server } from "http";
import errorHandler, { AppError } from "./utils/handler/errorHandler";
import { logger } from "./utils/logger";
import connectDb, { disconnectDb } from "./db/mongo";
import routes from "./routes";

const app: Express = express();

//Global Middleware
app.use(express.json());

//route
app.use("/api/v1", routes);

app.get("/api/check-server", (req: Request, res: Response) => {
  res.send("Server up and running");
});

//error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(error, res);
});

app.set("port", config.HTTP_PORT);

const server: Server = http.createServer(app);

server.listen(config.HTTP_PORT);

server.on(
  "error",
  async function (error: NodeJS.ErrnoException): Promise<void> {
    if (error.syscall != "listen") {
      logger.error(`Syscall error: ${JSON.stringify(error.message)}`);
      throw error;
    }

    switch (error.code) {
      case "EACCES":
        logger.error(`${config.HTTP_PORT} requires elevated privileges`);
        break;
      case "EADDRINUSE":
        logger.error(`PORT :${config.HTTP_PORT} is already in use`);
        break;
      default:
        logger.error(
          `Server error default context: ${JSON.stringify(error.message)}`
        );
        break;
    }
    await disconnectDb();
    process.exit(1);
  }
);

server.on("listening", function () {
  logger.info(`Server started on port ${config.HTTP_PORT}`);
  //Establish DB connection
  connectDb();
});

process.once("SIGINT", async function () {
  logger.info("Shut down initiated");
  await disconnectDb();
  server.close();
  process.exit();
});
