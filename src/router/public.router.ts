import { Router } from "express";
import { AuthController } from "../auth/auth.controller";

export const publicRouter = Router();

publicRouter.post("/login", AuthController.login);
publicRouter.post("/register", AuthController.register);