import express from 'express';
import 'dotenv/config';
import auth from './src/controllers/auth.js';
import tanks from './src/controllers/tanks.js';
import 'express-async-errors';
const app = express();
app.use(express.json());

process.env.NODE_ENV = 'production';

const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: true,
  });
  next();
};

app.use('/auth', auth);
app.use('/tanks', tanks);
app.use(errorHandling);

app.listen(8000);

export default app;
