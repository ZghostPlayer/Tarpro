const { Task } = require('../../../models');
const authService = require('../auth/auth.service');
const jwt = require('jsonwebtoken');
const secretKey = 'SUA_CHAVE_SECRETA';

const taskController = {

  async createTask(req, res) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
          try {
        const userId = authService.getUserIdFromToken(authHeader.split(' ')[1]);
        if (!userId) {
          return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        const task = await Task.create({ ...req.body, userId });
        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {

    res.status(401).json({ error: 'Token inválido ou ausente.' });
    return;
}

  },


  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async getTaskById(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async updateTask(req, res) {
    try {
      const [updatedRows] = await Task.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedRows > 0) {
        const updatedTask = await Task.findByPk(req.params.id);
        res.json(updatedTask);
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async deleteTask(req, res) {
    try {
      const deletedRows = await Task.destroy({
        where: { id: req.params.id }
      });
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserIdFromToken: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Token received:', token);
      console.log('UserID extracted:', decoded.userId);
      return decoded.userId;
    } catch (error) {
      return null;
    }
  },
};

module.exports = taskController;
