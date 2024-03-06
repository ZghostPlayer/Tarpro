// Arquivo: config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config')['development']; // Use 'test' ou 'production' conforme necessário

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    // Adicione outras opções de configuração conforme necessário
  }
);

module.exports = sequelize;