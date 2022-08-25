/** @type {import("express").RequestHandler} */
import { express } from 'express';
import dotenv from 'dotenv';
import auth from './src/controller/auth.js'

dotenv.config();

const app = express();

const errorHandling = (err, req, res) => {
  res.status(500).json({
    message: err.message,
    error: true
  })
}

app.use('/auth', auth)

app.use('/', errorHandling)

app.listen(8000, () => {
  console.log('App listening on 8000');
});
