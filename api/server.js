const express = require('express');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('../data/dbConfig')

const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');
const restrictedRouter = require('../restricted/restricted-router');
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
    saveUninitialized: false, // GDPR laws again setting cookies automatically
    store: new KnexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 10
    })
};

configMiddleware(server);
server.use(session(sessionConfig))
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/restricted', restrictedRouter)

server.get('/', (req, res) => {
    res.json({ api: "It's alive!"})
});

module.exports = server;