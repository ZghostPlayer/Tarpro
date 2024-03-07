const { Task } = require('../../../models');

const taskController = {
  // Criar uma nova tarefa
  async createTask(req, res) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter todas as tarefas
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obter uma tarefa pelo ID
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

  // Atualizar uma tarefa pelo ID
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

  // Excluir uma tarefa pelo ID
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
  }
};

module.exports = taskController;
