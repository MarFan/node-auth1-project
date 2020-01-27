const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

router.get('/', (req, res) => {
    res.json({ api: "It's alive!"})
});

router.get('/users', (req, res) => {
    Users.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Unable to get a list of users.'})
    })
});

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    Users.findUserBy({username})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password)
            .then(success => {
                if(success){
                    Users.find()
                    .then(list => res.status(200).json(list))
                    .catch(err => res.status(401).json({ message: 'YOU SHALL NOT PASS!!!'}))
                }else{
                    res.status(401).json({ message: 'YOU SHALL NOT PASS!!!'})
                }
            })
            .catch(err => res.status(401).json({ message: 'YOU SHALL NOT PASS!'}))
            
        } else {
            res.status(401).json({ message: 'Invalid Credentials.'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function hashMiddleware(req, res, next){

}

module.exports = router