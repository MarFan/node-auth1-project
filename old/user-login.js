const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

// /login
router.post('/', (req, res) => {
    let {username, password} = req.body;

    Users.findUserBy({username})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password)
            .then(success => {
                if(success){
                    res.status(200).json({ message: `Welcome ${user.username}`})
                }else{
                    res.status(401).json({ message: 'YOU SHALL NOT PASS!!!'})
                }
            })
            .catch(err => res.status(401).json({ message: 'Invalid Credentials.'}))
            
        } else {
            res.status(401).json({ message: 'Invalid Credentials.'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;