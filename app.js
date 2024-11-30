import express from "express";

const app = express();

app.use("/api/comments", (req, res, next) => {
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
});

export default app;
