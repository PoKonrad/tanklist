import db from '../configs/dbConnect';
import { DataTypes } from 'sequelize/types';

db.define('tanks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
      max: parseInt(new Date().toJSON().slice(0, 4)),
      min: 1900,
    },
  },
  introduced: {
    type: DataTypes.DATEONLY,
    validate: {
      isBefore: new Date().toJSON().slice(0, 10),
      isAfter: '1969-12-31',
    },
  },
  ammoCount: {
    type: DataTypes.INTEGER,
  },
  armorThickness: {
    type: DataTypes.INTEGER,
  },
  created: {
    type: DataTypes.DATE,
  },
  updated: {
    type: DataTypes.DATE,
  },
});
