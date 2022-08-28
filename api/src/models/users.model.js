import db from '../configs/dbConnect.js';
import { DataTypes } from 'sequelize';

const users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  button: {
    type: DataTypes.BOOLEAN,
  }
});

export default users