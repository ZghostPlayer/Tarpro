'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tasks', // Nome da tabela no banco de dados
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'category',
    timestamps: false // Desativa os campos createdAt e updatedAt gerados automaticamente pelo Sequelize
  });

  return Category;
};
