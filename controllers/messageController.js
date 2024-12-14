import Message from "../models/messageModel.js";

export async function createMessage(req, res) {
  try {
    const { username, password, content, parent } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const message = await Message.create({ username, content, parent });
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
    const { content } = req.body;
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Comment not found" });
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
