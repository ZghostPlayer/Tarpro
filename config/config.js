require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // Defina outras opções conforme necessário
  },
  // Adicione outras configurações de ambiente (test, production, etc.) conforme necessário
};

