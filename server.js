import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./models/database.js";
import express from "express";


export const TOKEN = '7P11QK39PIDI7Y9X63V5';
const PORT = 3000;

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

app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


try {
  await sequelize.authenticate();
  console.log('Database connected successfully!');
} catch (error) {
  console.error('Database connection failed:', error.message);
  process.exit(1);
}

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
