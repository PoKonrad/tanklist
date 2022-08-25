import dbQuery from '../configs/database.js';
import argon2 from 'argon2';
import generateToken from '../scripts/generateToken.js';
import { Router } from 'express';

const router = new Router();

router.post('/login', async (req, res) => {
  const postData = req.body;
  const dbResp = await dbQuery(
    'SELECT id, username, password, insertPerm FROM users WHERE username = ?',
    [postData.username, postData.password]
  );
  console.log(postData.username);
  if (dbResp.length === 0) {
    res.status(400).json('No such user');
    return;
  }

  if (await argon2.verify(dbResp[0].password, postData.password)) {
    console.log('Success!');
    return res
      .status(200)
      .json(
        await generateToken(
          dbResp[0].username,
          dbResp[0].id,
          dbResp[0].insertPerm
        )
      );
  } else {
    return res.status(400).json({
      err: 'wrongLogin',
    });
  }
});

router.post('/register', async (req, res) => {
  const userData = req.body;
  try {
    const resp = await dbQuery(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [userData.username, await argon2.hash(userData.password)]
    );
    console.log(resp);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Failure');
  }
  return res.status(200).json('Success');
});

router.post('/refreshToken', async (req, res) => {
  const refToken = req.body.refreshToken;

  const dbResp = await dbQuery(
    'SELECT refresh.token, refresh.expiration, refresh.user_id, users.username, users.insertPerm FROM refresh INNER JOIN users ON users.id = refresh.user_id WHERE refresh.token = ?',
    [refToken]
  );
  console.log(dbResp[0]);
  if (new Date(dbResp[0].expiration) < new Date()) {
    return res.status(400).json('Token Expired');
  }

  res
    .status(200)
    .json(
      await generateToken(
        dbResp[0].username,
        dbResp[0].user_id,
        dbResp[0].insertPerm
      )
    );
});

router.post('/logOff', async (req, res) => {
  const userData = req.body;
  await dbQuery('DELETE FROM refresh WHERE token = ?', [userData.refreshToken]);
  return res.status(200).json('Logged out');
});

export default router;
