import Conversation from "../models/Conversation.js";
import Text from "../models/Text.js";
import { errorHandler } from "../lib/error.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const conversationId = req.params.conversationId;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: { $in: senderId },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const newMessage = await Text.create({
      sender: senderId,
      conversation: conversationId,
      message: message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { userId } = req.body;
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.participants.push(userId);
    await conversation.save();

    res.status(200).json({ message: "Participant added successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.participants = conversation.participants.filter(
      (id) => id !== participantId
    );
    await conversation.save();

    res.status(200).json({ message: "Participant removed successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const senderId = req.id;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: { $in: senderId },
    });
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const messages = await Text.find(
      {
        conversation: conversation._id,
      },
      undefined,
      {
        sort: {
          createdAt: -1,
        },
        limit: pageSize,
        skip: skip,
      }
    );

    res.status(200).json({
      conversation,
      messages,
      currentPage: page,
      totalPages: Math.ceil(messages.length / pageSize),
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
