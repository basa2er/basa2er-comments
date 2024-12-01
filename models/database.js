import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './models/database.sqlite'
});

export default sequelize;