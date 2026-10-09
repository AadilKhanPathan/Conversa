import { Router } from "express";
import { sendMessage, getUserForSidebar, markMessagesAsSeen, getMessages } from "../controllers/message.controller.js";

const messageRouter = Router();

// POST: /api/message/send/:userId
messageRouter.post("/send/:id", sendMessage);

// GET: /api/message/users
messageRouter.get("/users", getUserForSidebar);

// GET: /api/message/:id
messageRouter.get(":id", getMessages);

// PUT: /api/message/mark/:id
messageRouter.put("mark/:id", markMessagesAsSeen)



export default messageRouter;