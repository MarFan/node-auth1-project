const express = require('express');

// Routers
const apiRouter = require('./api-router');
// middleware
const configMiddleware = require('./configure-middleware');

const server = express();
configMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;