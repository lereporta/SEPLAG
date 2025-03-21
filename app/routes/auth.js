const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = process.env.JWT_SECRET || 'seusegredo';

// Endpoint de Login: gera um token com expiração de 5 minutos
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Exemplo simples de validação de credenciais
  // Em produção, verifique as credenciais com um banco de dados ou serviço de autenticação.
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, secret, { expiresIn: '5m' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Credenciais inválidas' });
});

// Endpoint de Renovação: gera um novo token a partir do token atual
router.post('/renew', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  // Verifica o token ignorando a expiração para possibilitar a renovação
  jwt.verify(token, secret, { ignoreExpiration: true }, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    
    // Gera um novo token com expiração de 5 minutos
    const newToken = jwt.sign({ username: decoded.username }, secret, { expiresIn: '5m' });
    return res.json({ token: newToken });
  });
});

module.exports = router;

