import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: 'Unauthorized access.' });
      }

      res.locals.user = decoded;
      next();
    });
  }
};

export default auth;
