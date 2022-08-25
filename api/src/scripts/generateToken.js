import dbQuery from '../configs/database.js';
import jwt from 'jsonwebtoken';
import { cryptoRandomStringAsync } from 'crypto-random-string';

const generateToken = async (user, id, insertPerm) => {
  const dataToSign = {
    sub: id,
    username: user,
    insertPerm: insertPerm,
  };

  const refreshToken = await cryptoRandomStringAsync({ length: 40 });
  const token = jwt.sign(dataToSign, process.env.SECRET, {
    expiresIn: process.env.TOKEN_LIFE,
  });

  await dbQuery('DELETE FROM refresh WHERE user_id = ?', [id]);
  await dbQuery(
    'INSERT INTO refresh (user_id, token, expiration) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 4 HOUR))',
    [id, refreshToken]
  );

  const response = {
    status: 'Logged in',
    token: token,
    refreshToken: refreshToken,
  };

  return response;
};

export default generateToken;
