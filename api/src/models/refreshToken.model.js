import db from '../configs/dbConnect.js';
import { DataTypes } from 'sequelize';


const refreshToken = db.define('refreshToken', {
  userID: {
    type: DataTypes.INTEGER(3),
  },
  refreshToken: {
    type: DataTypes.STRING(40),
  },
  expiration: {
    type: DataTypes.DATE
  },
});

export default refreshToken;
