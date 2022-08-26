import usersModel from '../models/users.model.js';
import argon2 from 'argon2';
import generateToken from '../scripts/generateToken.js';
import { Router } from 'express';
import refreshTokenModel from '../models/refreshToken.model.js';

const router = new Router();

router.post('/login', async (req, res) => {
  const userData = req.body;

  const user = await usersModel.findOne({
    where: {
      email: userData.email,
    },
  });

  if (await argon2.verify(!user.password, userData.password)) {
    throw new Error('Wrong credentials');
  }

  const token = await generateToken(user.name, user.id);
  return res.status(200).json(token);
});

router.post('/register', async (req, res) => {
  const userData = req.body;

  await usersModel.create({
    name: userData.name,
    country: userData.country,
    email: userData.email,
    password: argon2.hash(userData.password),
    button: userData.button,
    creationData: new Date(),
  });

  return res.status(200).json('Success');
});

router.post('/refreshToken', async (req, res) => {
  const refToken = req.body.refreshToken;

  const refTokenData = await refreshTokenModel.findOne({
    where: {
      refreshToken: refToken,
    },
  });

  if (new Date(refTokenData.expiration) < new Date()) {
    throw new Error('Token Expired');
  }

  const token = await generateToken(refTokenData.name, refTokenData.userID);

  res.status(200).json(token);
});

router.post('/logOff', async (req, res) => {
  const userID = req.body.id;

  usersModel.destroy({
    where: {
      id: userID,
    },
  });

  refreshTokenModel.destroy({
    where: {
      userId: userID,
    },
  });

  return res.status(200).json('Logged out');
});

export default router;
