import { Sequelize } from "@sequelize/sqlite3";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default sequelize;