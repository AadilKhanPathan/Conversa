import express from "express";
import messageRouter from "./src/routes/message.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is live")
})

app.use("api/message", messageRouter);

export default app;
