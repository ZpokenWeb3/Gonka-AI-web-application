import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());

  app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  }));
  
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const originalSend = res.send;
    
    res.send = function(body: any) {
      const duration = Date.now() - startTime;
      console.log(`[${req.method}] ${req.path} - ${res.statusCode} - ${duration}ms`);
      return originalSend.call(this, body);
    };
    
    next();
  });

  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(routes);

  return app;
};