import { DataTypes } from "@sequelize/sqlite3";
import sequelize from "./database.js";

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
