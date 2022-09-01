import usersModel from '../models/users.model.js';
import 'express-async-errors';
import argon2 from 'argon2';
import generateToken from '../scripts/generateToken.js';
import { Router } from 'express';
import refreshTokenModel from '../models/refreshToken.model.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.post('/login', async (req, res) => {
  const userData = req.body;

  const user = await usersModel.findOne({
    where: {
      email: userData.email,
    },
  });

  if (!user?.password) {
    throw new Error('Wrong credentials');
  }

  if (!(await argon2.verify(user.password, userData.password))) {
    throw new Error('Wrong credentials');
  }

  const token = await generateToken(user.email, user.id);
  return res.status(200).json({
    ...token,
    userData: {
      id: user.id,
      name: user.name,
      country: user.country,
      email: user.email,
      button: user.button,
    },
  });
});

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  }),
  async (req, res) => {
    const userData = req.body;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        error: true,
        errors: validationErrors,
      });
    }

    const userWithEmail = await usersModel.findOne({
      where: {
        email: userData.email,
      },
    });

    if (userWithEmail?.id) {
      throw new Error('User already exists');
    }

    const hashedPassword = await argon2.hash(userData.password);

    await usersModel.create({
      name: userData.name,
      country: userData.country,
      email: userData.email,
      password: hashedPassword,
      button: userData.button,
    });

    return res.status(200).json('Success');
  }
);

router.post('/refreshToken', async (req, res) => {
  const refToken = req.body.refreshToken;

  if (!refToken) {
    throw new Error('Missing refresh token');
  }

  const refTokenData = await refreshTokenModel.findOne({
    where: {
      refreshToken: refToken,
    },
  });

  if (!refTokenData?.expiration) {
    throw new Error('Refresh Token not found');
  }

  if (new Date(refTokenData?.expiration) < new Date()) {
    if (!refToken?.expiration) {
      throw new Error('Refresh token expired');
    }
  }

  const user = await usersModel.findOne({
    where: {
      id: refTokenData.userID,
    },
  });

  const token = await generateToken(user.email, refTokenData.userID, user.name);

  res.status(200).json(token);
});

router.post('/logOff', async (req, res) => {
  const refreshToken = req.body.refreshToken;

  refreshTokenModel.destroy({
    where: {
      refreshToken: refreshToken,
    },
  });

  return res.sendStatus(204);
});

const errorHandling = (err, req, res, next) => {
  res.status(401).json({
    error: true,
    message: err.message,
  });
};

router.use(errorHandling);

export default router;
