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
      validate: {
        isAlphanumeric: {
          msg: "Username can only contain letters and numbers.",
        },
        len: {
          args: [3, 25],
          msg: "Username must be between 3 and 25 characters long.",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long.",
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked"),
      defaultValue: "active",
    }
  },
  {
    timestamps: false,
  }
);

export default User;
