import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export async function createMessage(req, res) {
  try {
    const { username, password, content, parent } = req.body;

    const user = await User.findByPk(username);
    if (!user)
      return res.status(401).json({ code: 31, message: "Invalid Username!" });
    if (user.password !== password)
      return res.status(401).json({ code: 32, message: "Invalid Password!" });
    if (!content)
      return res.status(400).json({ code: 33, message: "Comment is Empty!" });

    const message = await Message.create({ user: username, content, parent });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ code: 30, message: error.message });
  }
}

export async function readMessages(req, res) {
  try {
    const messages = await Message.findAll({
      where: { parent: req.params.id }
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ code: 40, message: error.message });
  }
}

export async function updateMessage(req, res) {
  try {
    const { username, password, content } = req.body;

    const user = await User.findByPk(username);
    if (!user)
      return res.status(401).json({ code: 51, message: "Invalid Username!" });
    if (user.password !== password)
      return res.status(401).json({ code: 52, message: "Invalid Password!" });

    const message = await Message.findByPk(req.params.id);
    if (!message)
      return res.status(404).json({ code: 53, message: "Comment not Found!" });
    if (message.user != username) 
      return res.status(403).json({ code: 54, message: "Access Forbidden!" });
    if (!content)
      return res.status(400).json({ code: 55, message: "Comment is Empty!" });

    message.content = content || message.content;
    message.date = new Date();
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ code: 50, message: error.message });
  }
}

export async function deleteMessage(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findByPk(username);
    if (!user)
      return res.status(401).json({ code: 61, message: "Invalid Username!" });
    if (user.password !== password)
      return res.status(401).json({ code: 62, message: "Invalid Password!" });
    
    const message = await Message.findByPk(req.params.id);
    if (!message)
      return res.status(404).json({ code: 63, message: "Comment not Found!" });
    if (message.user != username) 
      return res.status(403).json({ code: 64, message: "Access Forbidden!" });

    await message.destroy();
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ code: 60, message: error.message });
  }
}
