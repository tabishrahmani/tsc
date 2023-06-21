export enum ENVIRONMENT {
  DEV = "development",
  STAGE = "staging",
  PROD = "production",
}

export enum DB_CONNECTION_STATES {
  DISCONNECTED = 0,
  CONNECTED = 1,
  CONNECTING = 2,
  DISCONNECTING = 3,
}
