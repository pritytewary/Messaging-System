// routes/conversationRoutes.js

import express from "express";
import {
  sendMessage,
  addParticipant,
  removeParticipant,
  getMessages,
} from "../controllers/conversationController.js";
import authMiddleware from "../lib/auth.js";

const router = express.Router();

router.post("/send/:conversationId", authMiddleware, sendMessage);
router.post("/:conversationId/participants", authMiddleware, addParticipant);
router.delete(
  "/:conversationId/participants/:participantId",
  authMiddleware,
  removeParticipant
);
router.get("/:conversationId/messages", authMiddleware, getMessages);

export default router;
