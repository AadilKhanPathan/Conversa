import { Router } from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// POST: /api/auth/register
authRouter.post("/sign-up", signUp);

// GET: /api/auth/login
authRouter.get("/login", login);


export default authRouter;