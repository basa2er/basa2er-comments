import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

export default sequelize;