const { Category } = require('../../../models');

const categoryController = {
  // Criar uma nova categoria
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter todas as categorias
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obter uma categoria pelo ID
  async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar uma categoria pelo ID
  async updateCategory(req, res) {
    try {
      const [updatedRows] = await Category.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedRows > 0) {
        const updatedCategory = await Category.findByPk(req.params.id);
        res.json(updatedCategory);
      } else {
        res.status(404).json({ error: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Excluir uma categoria pelo ID
  async deleteCategory(req, res) {
    try {
      const deletedRows = await Category.destroy({
        where: { id: req.params.id }
      });
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoryController;
