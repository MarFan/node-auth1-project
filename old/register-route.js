const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

router.post('/', (req, res) => {
    let newUser = req.body;

    if(req.body) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                res.status(500).json(err)
            } else {
                newUser.password = hash
                Users.addUser(newUser)
                .then(user => res.status(201).json(user))
                .catch(err => {console.log(err); res.status(500).json({ error: 'There was an error adding a new user.'})})
            }
            
        })
    } else {
        res.status(500).json({ error: "missing user info"})
    }

})

module.exports = router;