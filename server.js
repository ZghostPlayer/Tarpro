require('dotenv').config();
const userController = require('./src/server/controllers/userController');
const categoryController = require('./src/server/controllers/categoryController');
const taskController = require('./src/server/controllers/taskController');
const authController = require('./src/server/controllers/auth.controller');
const checkTokenMiddleware = require('./src/server/middlewares/checkTokenMiddleware');
const { User } = require('./models');
const { Task } = require('./models');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
//auth.service.js
const jwt = require('jsonwebtoken');
const secretKey = 'SUA_CHAVE_SECRETA'; 

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/api/protected-route', checkTokenMiddleware, (req, res) => {
  res.json({ message: 'Você está autenticado.' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());

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

// Rotas para tarefas - Aplique o middleware de token apenas aqui
app.post('/tasks', checkTokenMiddleware, taskController.createTask);
app.get('/tasks', checkTokenMiddleware, taskController.getAllTasks);
app.get('/tasks/:id', checkTokenMiddleware, taskController.getTaskById);
app.put('/tasks/:id', checkTokenMiddleware, taskController.updateTask);
app.delete('/tasks/:id', checkTokenMiddleware, taskController.deleteTask);

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});


