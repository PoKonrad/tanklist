/** @type {import("express").RequestHandler} */
import express from 'express';
import 'dotenv/config';
import auth from './src/controllers/auth.js'
import tank from './src/controllers/tank.js'
import 'express-async-errors';
const app = express();
app.use(express.json())

process.env.NODE_ENV = 'production'

const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: true
  })
  next()
}

app.get('/', async (req, res) => {
  await new Promise((reject, resolve )=> {
    throw new Error('owo')
  })
})

app.use('/auth', auth)
app.use('/tank', tank)
app.use(errorHandling)


app.listen(8000, () => {
  console.log('App listening on 8000');
});
