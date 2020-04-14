const express = require('express');
const UserController = require('./controllers/UserController');
const MissionController = require('./controllers/MissionController');
const CrewController = require('./controllers/CrewController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.destroy);

routes.get('/missions', MissionController.index);
routes.post('/missions', MissionController.store);
routes.get('/missions/:mission_id', MissionController.show);
routes.put('/missions/:mission_id', MissionController.update);
routes.delete('/missions/:mission_id', MissionController.destroy);

routes.post('/missions/:mission_id/crews', CrewController.store);

routes.get('/users/:user_id/reports', ReportController.show);

module.exports = routes;