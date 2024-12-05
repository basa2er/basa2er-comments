import { DataTypes } from "@sequelize/core";
import sequelize from "./database.js";

const Message = sequelize.define("Message", {
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

export default Message;
