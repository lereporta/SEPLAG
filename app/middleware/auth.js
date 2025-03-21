const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'seusegredo';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido ou expirado' });
    req.user = decoded;
    next();
  });
};

