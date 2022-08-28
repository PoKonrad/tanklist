import db from '../configs/dbConnect.js';
import { DataTypes } from 'sequelize';

const dateTomorrow = new Date();

dateTomorrow.setDate(dateTomorrow.getDate() + 1);

const tankModel = db.define('tanks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sideNumber: {
    type: DataTypes.STRING,
  },
  producer: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  currentMod: {
    type: DataTypes.STRING,
  },
  productionYear: {
    type: DataTypes.INTEGER(4),
    validate: {
      max: parseInt(dateTomorrow.toJSON().slice(0, 4)),
      min: 1900,
    },
  },
  introduced: {
    type: DataTypes.DATEONLY,
    validate: {
      isBefore: dateTomorrow.toJSON().slice(0, 10),
      isAfter: '1969-12-31',
    },
  },
  ammoCount: {
    type: DataTypes.INTEGER,
  },
  armorThickness: {
    type: DataTypes.INTEGER,
  }
});

export default tankModel;
