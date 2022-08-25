/** @type {import("express").RequestHandler} */
import { express } from 'express';

const app = express();

app.listen(8000, () => {
  console.log('App listening on 8000');
});
