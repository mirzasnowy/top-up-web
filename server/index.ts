import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import midtransRouter from "./routes/midtrans";
import vipResellerRoutes from "./routes/game/vipreseller";
import dotenv from 'dotenv';

dotenv.config();
export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/game/vipreseller', vipResellerRoutes);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/midtrans", midtransRouter);

  return app;
}
