const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../auth/auth.service');
const { User, sequelize } = require('../../../models');
const { QueryTypes } = require('sequelize');

const authController = {
  async register(req, res) {
    try {
      if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Dados necessários não fornecidos.' });
      }

      const hashedPassword = await authService.hashPassword(req.body.password);

      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
      });

      res.status(201).json({ userId: newUser.id });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Login e senha são necessários.' });
      }

      const user = await sequelize.query(
        'SELECT id, username, password FROM "Users" WHERE username = $1',
        { 
          type: QueryTypes.SELECT,
          bind: [req.body.username]
        }
      );

      if (user.length === 0) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      const validPassword = await authService.comparePassword(req.body.password, user[0].password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Senha inválida.' });
      }

      const token = authService.generateToken(user[0]);
      console.log('Generated token:', token);

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;