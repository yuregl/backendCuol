import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import { createCitiesRouter } from "./CitiesRoutes";
import { createClientRouter } from "./ClientsRoutes";

async function exportApp() {
  const app = express();
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(createCitiesRouter());
  app.use(createClientRouter());
  app.use((err: Error, request: Request, response: Response) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  });
  return app;
}

export { exportApp };
