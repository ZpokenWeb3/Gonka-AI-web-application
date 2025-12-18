import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(routes);

  return app;
};