import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export async function createMessage(req, res) {
  try {
    const { username, password, content, parent } = req.body;

    const user = await User.findByPk(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required!" });
    }

    const message = await Message.create({ user: username, content, parent });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function readMessages(req, res) {
  try {
    const messages = await Message.findAll({
      where: { parent: req.params.id }
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateMessage(req, res) {
  try {
    const { username, password, content } = req.body;

    const user = await User.findByPk(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found!" });
    }
    if (message.user != username) {
      return res.status(403).json({ message: "Access forbidden!" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required!" });
    }

    message.content = content || message.content;
    message.date = new Date();
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteMessage(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findByPk(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found!" });
    }
    if (message.user != username) {
      return res.status(403).json({ message: "Access forbidden!" });
    }

    await message.destroy();
    res.status(200).json({ message: "Comment deleted." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
