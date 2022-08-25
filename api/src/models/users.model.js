import db from '../configs/dbConnect';
import { DataTypes } from 'sequelize/types';

const users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  button: {
    type: DataTypes.BOOLEAN,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
});

export default users