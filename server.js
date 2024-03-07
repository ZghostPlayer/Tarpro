require('dotenv').config();
const userController = require('./src/server/controllers/userController');
const categoryController = require('./src/server/controllers/categoryController');
const taskController = require('./src/server/controllers/taskController');
const authController = require('./src/server/controllers/auth.controller');
const { Task } = require('./models');
const express = require('express');
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

// Rotas para categorias
app.post('/categories', categoryController.createCategory);
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:id', categoryController.getCategoryById);
app.put('/categories/:id', categoryController.updateCategory);
app.delete('/categories/:id', categoryController.deleteCategory);

// Rotas para tarefas
app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});


