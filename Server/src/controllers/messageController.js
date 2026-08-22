import Message from "../models/Message.js";
import Project from "../models/Project.js";

// =====================================
// Send Message
// =====================================
export const sendMessage = async (req, res) => {
  try {
    const { projectId, receiverId, message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const newMessage = await Message.create({
      project: projectId,
      sender: req.user.id,
      receiver: receiverId,
      message,
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name")
      .populate("receiver", "name");

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: populatedMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Conversation
// =====================================
export const getConversation = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({
      project: projectId,
    })
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};