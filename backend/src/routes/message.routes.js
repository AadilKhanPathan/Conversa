import { Router } from "express";
import {
  sendMessage,
  getAllContact,
  markMessagesAsSeen,
  getMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.use(protectRoute);

// POST: /api/message/send/:userId
messageRouter.post("/send/:id", sendMessage);

// GET: /api/message/contacts
messageRouter.get("/contacts", getAllContact);

// GET: /api/message/:id
messageRouter.get("/:id", getMessages);

// PUT: /api/message/mark/:id
messageRouter.put("/mark/:id", markMessagesAsSeen);

export default messageRouter;
