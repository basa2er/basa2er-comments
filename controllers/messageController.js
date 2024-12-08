export function getAllMessages(req, res) {
    const comments = [
      {
        _id: "94HD2MZ",
        author: "Commenter 1",
        date: "30/11/2024 23:53",
        parent: null,
        content: "This is a simplistic blog website template that displays a list of blogs, allows searching blogs, and displays the content of a selected blog. It is adapted for both computer, tablet, and smartphone views.",
      },
      {
        _id: "X266KE8",
        author: "Commenter 2",
        date: "17/07/2023 17:02",
        parent: "94HD2MZ",
        content: "The default view shows a welcome message, followed by the list of all blogs sorted by date, you can return to this view from anywhere by clicking on the website logo located in the navigation bar, while the search bar on its right allows filtering blogs by title and by tags.",
      },
    ];
    res.status(200).json(comments);
  };




  /*
  import User from "../models/userModel.js";

export async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
*/