import messageRoutes from "./routes/messageRoutes.js";
import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString("en-UK")} : ${req.method} ${req.url}`);
  next();
});

app.use("/api/comments", messageRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
