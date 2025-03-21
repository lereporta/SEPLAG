const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Importa o middleware de autenticação e as rotas de autenticação
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');

app.use(express.json());

// Endpoint de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas de autenticação (login e renew) sem proteção de middleware
app.use('/', authRoutes);

// Aplica o middleware de autenticação para os endpoints protegidos abaixo
app.use(authMiddleware);

// CRUD exemplo: Servidor Efetivo
app.get('/servidor-efetivo', (req, res) => {
  // Lógica para listar servidores efetivos
  res.json({ data: [] });
});

app.post('/servidor-efetivo', (req, res) => {
  // Lógica para criar um novo servidor efetivo
  res.status(201).json({ message: 'Servidor criado' });
});

// Outros endpoints: Servidor Temporário, Unidade, Lotação e upload de fotos
// Crie os endpoints PUT e DELETE conforme necessário

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

