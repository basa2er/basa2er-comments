import User from "../models/userModel.js";

export async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    await User.create({ username, password });
    res.status(201).json({ message: "User Created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function authenticateUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findByPk(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "FAILURE" });
    }

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
