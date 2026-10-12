import express from "express";
import cookieParser from "cookie-parser";

import messageRouter from "./src/routes/message.routes.js";
import authRouter from "./src/routes/auth.routes.js";


const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is live")
})

app.use("/api/auth", authRouter);

app.use("/api/message", messageRouter);

export default app;
