'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}

  Task.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
      defaultValue: 'Pending'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    categoryId: { // Adiciona a chave estrangeira para a categoria
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories', // Nome da tabela de categorias
        key: 'id'
      },
      allowNull: true // Permite que a tarefa não tenha uma categoria associada
    }
  }, {
    sequelize,
    modelName: 'Task',
    timestamps: true
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
    Task.belongsTo(models.Category, { foreignKey: 'categoryId' }); // Adiciona a associação com a categoria
  };

  return Task;
};
