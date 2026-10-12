import { Router } from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import user from "../models/user.model.js";

const authRouter = Router();

// POST: /api/auth/register
authRouter.post("/sign-up", signUp);

// GET: /api/auth/login
authRouter.post("/login", login);

// GET: /api/auth/me
authRouter.get("/me", protectRoute, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    })
})

export default authRouter;