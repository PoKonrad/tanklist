import { Sequelize } from 'sequelize';
import dbconfig from './db.config.js';
const sequelize = new Sequelize(
  'tanks',
  dbconfig.DB_USER,
  dbconfig.DB_PASSWORD,
  {
    host: dbconfig.DB_HOST,
    dialect: 'mariadb',
    password: dbconfig.DB_PASSWORD,
    logging: process.env.NODE_ENV == 'test' ? false : true,
  }
);

sequelize.authenticate().catch((error) => {
  console.error(error);
});

sequelize.sync().catch((error) => {
  console.error(error);
});

export default sequelize;
