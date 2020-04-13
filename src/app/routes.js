const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.destroy)

module.exports = routes;