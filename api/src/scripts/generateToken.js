import refreshTokenModel from '../models/refreshToken.model.js';
import jwt from 'jsonwebtoken';
import { cryptoRandomStringAsync } from 'crypto-random-string';

/**
 * @param {string} user Username
 * @param {number} id User id
 * @returns Token object
 */
const generateToken = async (user, id) => {
  const dataToSign = {
    sub: id,
    username: user,
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

  await refreshTokenModel.create({
    userID: id,
    refreshToken: refreshToken,
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
