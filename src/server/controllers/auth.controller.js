const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Usaremos o pacote pg para conectar com o PostgreSQL
const authService = require('../auth/auth.service'); // Certifique-se de que o caminho esteja correto para o seu authService

// Inicializa a conexão com o banco de dados (substitua com suas credenciais de DB)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

const authController = {
  // Endpoint para registro
  async register(req, res) {
    try {
      // Validação básica
      if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Dados necessários não fornecidos.' });
      }

      // Hash da senha
      const hashedPassword = await authService.hashPassword(req.body.password);

      // Inserção no banco de dados
      const result = await pool.query(
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
        [req.body.username, hashedPassword, req.body.email]
      );

      // Responde com o ID do usuário recém-criado
      res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Endpoint para login
  async login(req, res) {
    try {
      // Validação básica
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Login e senha são necessários.' });
      }

      // Verifica o usuário no banco de dados
      const user = await pool.query(
        'SELECT id, username, password FROM users WHERE username = $1',
        [req.body.username]
      );

      // Verifica se o usuário foi encontrado
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      // Compara a senha hasheada
      const validPassword = await authService.comparePassword(req.body.password, user.rows[0].password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Senha inválida.' });
      }

      // Gera um token JWT
      const token = authService.generateToken(user.rows[0]);

      // Responde com o token JWT
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;