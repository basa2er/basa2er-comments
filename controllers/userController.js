import User from "../models/userModel.js";
import { exportData, importData } from "../database/backupUtilities.js";

export async function registerUser(req, res) {
  try {
    let { username, password } = req.body;
    username = username.trim();
    const usernameRegex = /^[a-zA-Z0-9\u0600-\u06FF ]+$/;

    if (!usernameRegex.test(username))
      return res.status(400).json({ code: 11, message: "Username must be Alphanumeric!" });
    if (username.length < 3 || username.length > 25)
      return res.status(400).json({ code: 12, message: "Invalid Username Length!" });
    if (password.length < 8 || password.length > 100)
      return res.status(400).json({ code: 13, message: "Invalid Password Length!" });

    await User.create({ username, password });
    res.status(201).json({ code: 19, message: "User Registered." });
  } catch (error) {
    res.status(400).json({ code: 10, message: error.message });
  }
}

export async function authenticateUser(req, res) {
  try {
    let { username, password } = req.body;

    const user = await User.findByPk(username);
    if (!user)
      return res.status(401).json({ code: 21, message: "Invalid Username!" });
    if (user.password != password)
      return res.status(401).json({ code: 22, message: "Invalid Password!" });
    if (user.status == "blocked")
      return res.status(403).json({ code: 23, message: "Account Blocked!" });

    res.status(200).json({ code: 29, message: "User Authenticated." });
  } catch (error) {
    res.status(400).json({ code: 20, message: error.message });
  }
}


export async function exportUsers(req, res) {
  await exportData(req, res, User);
}

export async function importUsers(req, res) {
  await importData(req, res, User);
}