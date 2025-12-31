import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleSignup, handleLogout } from "./routes/auth";
import {
  handleCreateReport,
  handleGetReports,
  handleGetReportById,
  handleVerifyReport,
  handleResolveReport,
  handleDeleteReport,
} from "./routes/reports";
import { handleGetWards, handleGetWardById } from "./routes/wards";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/logout", handleLogout);

  // Reports routes
  app.post("/api/reports", handleCreateReport);
  app.get("/api/reports", handleGetReports);
  app.get("/api/reports/:id", handleGetReportById);
  app.patch("/api/reports/:id/verify", handleVerifyReport);
  app.patch("/api/reports/:id/resolve", handleResolveReport);
  app.delete("/api/reports/:id", handleDeleteReport);

  // Wards routes
  app.get("/api/wards", handleGetWards);
  app.get("/api/wards/:id", handleGetWardById);

  return app;
}
