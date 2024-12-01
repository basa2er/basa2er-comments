import { DataTypes } from "@sequelize/core";
import sequelize from "./database.js";

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Message;
