import winston, { Logger as WinstonLogger, transports } from "winston";

class Logger {
  private logger: WinstonLogger & { [key: string]: any };

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        this.winstonConsoleFormat()
      ),
      level: "info",
      transports: [
        new transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new transports.File({
          filename: "logs/combined.log",
        }),
        new transports.File({
          filename: "logs/warning.log",
          level: "warn",
        }),
      ],
    });

    this.logger.on("error", (error) => {
      console.error("Logger transport error:", error);
    });

    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "staging"
    ) {
      this.logger.add(
        new transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            this.winstonConsoleFormat()
          ),
        })
      );
    }
  }

  private winstonConsoleFormat() {
    return winston.format.printf(({ timestamp, level, message }) => {
      const messageObj = {
        message,
      };
      return `[${timestamp}][${level}] ${JSON.stringify(messageObj)}`;
    });
  }

  public debug(log: string, metadata?: any) {
    this.logger.debug(log, metadata);
  }

  public info(log: string, metadata?: any) {
    this.logger.info(log, metadata);
  }

  public warn(log: string, metadata?: any) {
    this.logger.warn(log, metadata);
  }

  public error(log: string, metadata?: any) {
    this.logger.error(log, metadata);
  }

  public log(level: string, log: string, metadata?: any) {
    const metadataObject: any = {};
    if (metadata) metadataObject.metadata = metadata;

    this.logger[level](log, metadataObject);
  }
}

export default new Logger();

export const getLogger = (): Logger => {
  return new Logger();
};
