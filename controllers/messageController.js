import { Op } from "@sequelize/core";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import fs from 'fs';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';


const ADMIN_TOKEN = '7P11QK39PIDI7Y9X63V5';

async function authorizeUser(username, password) {
  const user = await User.findByPk(username);
  if (!user)
    return { code: 1, message: "Invalid Username!" };
  if (user.password != password)
    return { code: 2, message: "Invalid Password!" };
  if (user.status == "blocked")
    return { code: 3, message: "Account Blocked!" };
  
  return { code: 0, message: "User Authorized." };
}


export async function readMessages(req, res) {
  try {
    const messages = await Message.findAll({
      where: {
        parent: req.params.id,
        status: { [Op.ne]: "removed" },
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ code: 40, message: error.message });
  }
}

export async function createMessage(req, res) {
  try {
    const { username, password, content, parent } = req.body;

    if (!content)
      return res.status(400).json({ code: 34, message: "Comment is Empty!" });
    
    const authorization = await authorizeUser(username, password);
    if (authorization.code != 0)
      return res.status(401).json({ code: 30 + authorization.code, message: authorization.message });

    const message = await Message.create({ user: username, content, parent });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ code: 30, message: error.message });
  }
}

export async function updateMessage(req, res) {
  try {
    const { username, password, content } = req.body;

    if (!content)
      return res.status(400).json({ code: 56, message: "Comment is Empty!" });

    const authorization = await authorizeUser(username, password);
    if (authorization.code != 0)
      return res.status(401).json({ code: 50 + authorization.code, message: authorization.message });

    const message = await Message.findByPk(req.params.id);
    if (!message)
      return res.status(404).json({ code: 54, message: "Comment not Found!" });
    if (message.user != username)
      return res.status(403).json({ code: 55, message: "Access Forbidden!" });

    message.content = content;
    message.status = "edited";
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

    const authorization = await authorizeUser(username, password);
    if (authorization.code != 0)
      return res.status(401).json({ code: 60 + authorization.code, message: authorization.message });
    
    const message = await Message.findByPk(req.params.id);
    if (!message)
      return res.status(404).json({ code: 64, message: "Comment not Found!" });
    if (message.user != username)
      return res.status(403).json({ code: 65, message: "Access Forbidden!" });

    message.status = "removed";
    message.date = new Date();
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ code: 60, message: error.message });
  }
}


export async function exportMessages(req, res) {
  try {
    const { token } = req.body;
    if (token != ADMIN_TOKEN)
      return res.status(401).json({ code: 71, message: "Access Denied!" });
    
    const messages = await Message.findAll();
    const filePath = join(
      dirname(fileURLToPath(import.meta.url)),
      "../database",
      `messages_${Date.now()}.json`
    );

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.download(filePath, `messages_${Date.now()}.json`, (error) => {
      if (error)
        res.status(500).json({ code: 72, message: "Download Failed!" });
    });
  } catch (error) {
    res.status(400).json({ code: 70, message: error.message });
  }
}