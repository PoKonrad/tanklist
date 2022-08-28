import refreshTokenModel from '../models/refreshToken.model.js';
import jwt from 'jsonwebtoken';
import { cryptoRandomStringAsync } from 'crypto-random-string';

const addHours = (numOfHours, date) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

/**
 * @param {string} email Email
 * @param {number} id User id
 * @returns Token object
 */
const generateToken = async (user, id) => {
  const dataToSign = {
    sub: id,
    email: user,
  };

  const refreshToken = await cryptoRandomStringAsync({ length: 40 });
  const token = jwt.sign(dataToSign, process.env.SECRET, {
    expiresIn: process.env.TOKEN_LIFE,
  });

  await refreshTokenModel.destroy({
    where: {
      userID: id,
    },
  });

  const expiresAt = addHours(4, new Date())

  await refreshTokenModel.create({
    userID: id,
    refreshToken: refreshToken,
    expiration: expiresAt
  });

  const response = {
    status: 'Logged in',
    token,
    refreshToken,
    userData: dataToSign,
  };

  return response;
};

export default generateToken;
