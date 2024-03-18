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
        model: 'Users', // Nome da tabela no banco de dados
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    timestamps: true
  },
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Task;
};
