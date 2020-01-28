const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restircted-middleware');

router.get('/', restricted, (req, res) => {
    Users.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
        res.status(500).json({ error: 'Unable to get a list of users.'})
    })
});

module.exports = router;