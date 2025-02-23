import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./models/database.js";
import express from "express";

export const ADMIN_TOKEN = '7P11QK39PIDI7Y9X63V5';

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/db', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.send('Database connected successfully!');
  } catch (error) {
    res.status(500).send('Database connexion failed: ' + error.message);
  }
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString("en-UK")} : ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
