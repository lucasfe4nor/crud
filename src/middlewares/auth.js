import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error.' });
  }

  const [prefix, token] = parts;

  if (!/^Bearer$/i.test(prefix)) {
    return res.status(401).send({ error: 'Token malformatted.' });
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token.' });
    }

    next();
  });
}

export default authMiddleware;
