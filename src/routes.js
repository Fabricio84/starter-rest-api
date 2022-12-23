const express = require('express');

const BlockedDatesController = require('./controllers/BlockedDatesController');

const routes = express.Router();

const blockedDatesController = new BlockedDatesController();

routes.get('/blocked-dates', blockedDatesController.index);

module.exports = routes;