import Message from "../models/messageModel.js";

export async function createMessage(req, res) {
  try {
    const { author, content, parent } = req.body;
    const message = await Message.create({ author, content, parent });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function readMessage(req, res) {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateMessage(req, res) {
  try {
    const { name, email } = req.body;
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found" });
    }
    message.name = name || message.name;
    message.email = email || message.email;
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteMessage(req, res) {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await message.destroy();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}