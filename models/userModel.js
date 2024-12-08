import { DataTypes } from "@sequelize/core";
import sequelize from "./database.js";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
