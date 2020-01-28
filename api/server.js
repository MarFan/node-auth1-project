const express = require('express');
const session = require('express-session')
// Routers
const apiRouter = require('./api-router');
// middleware
const configMiddleware = require('./configure-middleware');

const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret', // env variable would be better
    cookie: {
        maxAge: 1000 * 30,
        secure: false, // env varaiable set to true for production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false // GDPR laws again setting cookies automatically    
};

configMiddleware(server);
server.use(session(sessionConfig))

server.use('/api', apiRouter);

module.exports = server;