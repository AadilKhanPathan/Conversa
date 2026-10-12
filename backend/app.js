import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./src/routes/message.routes.js";
import authRouter from "./src/routes/auth.routes.js";


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is live")
})

app.use("/api/auth", authRouter);

app.use("/api/message", messageRouter);

export default app;
