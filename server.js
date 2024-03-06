require('dotenv').config();
const userController = require('./src/server/controllers/userController');
const express = require('express');
const authController = require('./src/server/controllers/auth.controller'); // Ajuste o caminho se necessário // Ajuste o caminho se necessário
const { sequelize } = require('./models');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json()); // Para JSON no corpo da requisição

// Rotas de autenticação
app.post('/register', authController.register);
app.post('/login', authController.login);

// Rotas para usuários
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

sequelize.sync({force: true}).then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});


