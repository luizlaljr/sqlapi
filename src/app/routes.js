const express = require('express');
const UserController = require('./controllers/UserController');
const MissionController = require('./controllers/MissionController');
const CrewController = require('./controllers/CrewController');
const ReportController = require('./controllers/ReportController');
const LoginController = require('./controllers/LoginController');
const TotalizerController = require('./controllers/TotalizerController');
const ManagerController = require('./controllers/ManagerController');

const LoginMiddleware = require('./middlewares/LoginMiddleware');

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

routes.get('/missions/:mission_id/crews', CrewController.index);
routes.post('/missions/:mission_id/crews', CrewController.store);
routes.get('/missions/:mission_id/crews/:user_id', CrewController.show);
routes.put('/missions/:mission_id/crews/:user_id', CrewController.update);
routes.delete('/missions/:mission_id/crews/:user_id', CrewController.destroy);

routes.get('/users/:user_id/reports', LoginMiddleware, ReportController.show);

routes.get('/users/:user_id/totalizers', LoginMiddleware, TotalizerController.show);

routes.get('/manager', ManagerController.index);

routes.post('/login', LoginController.store);

module.exports = routes;