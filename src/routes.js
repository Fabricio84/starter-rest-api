const express = require('express');

const BlockedDatesController = require('./controllers/BlockedDatesController');

const routes = express.Router();

const blockedDatesController = new BlockedDatesController();

routes.get('/blocked-dates', blockedDatesController.index);
routes.get('/blocked-dates/:id', blockedDatesController.show);
routes.post('/blocked-dates', blockedDatesController.create);
routes.put('/blocked-dates/:id', blockedDatesController.update);
routes.delete('/blocked-dates/:id', blockedDatesController.remove);

module.exports = routes;