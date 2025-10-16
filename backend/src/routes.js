const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const TaskController = require('./controllers/TaskController');
const authMiddleware = require('./middlewares/auth');

const routes = new Router();

// --- Rotas Públicas (não precisam de token) ---
routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

routes.use(authMiddleware);

// --- Rotas de Tarefas (Protegidas) ---
routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.create);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete);

module.exports = routes;