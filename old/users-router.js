const router = require('express').Router();

const Users = require('../users/user-model');

router.get('/', (req, res) => {
    Users.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Unable to get a list of users.'})
    })
});

module.exports = router;