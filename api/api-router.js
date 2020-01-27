const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');
const restricted = require('../auth/restircted-middleware');

router.get('/', (req, res) => {
    res.json({ api: "It's alive!"})
});

router.get('/users', restricted, (req, res) => {
    Users.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
        res.status(500).json({ error: 'Unable to get a list of users.'})
    })
});

router.post('/register', (req, res) => {
    let newUser = req.body;


    const hash = bcrypt.hashSync(newUser.password, 12)
    newUser.password = hash;

    if(req.body) {
        Users.addUser(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => {console.log(err); res.status(500).json({ error: 'There was an error adding a new user.'})})    
    } else {
        res.status(500).json({ error: "missing user info"})
    }

})

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    Users.findUserBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            Users.find()
            .then(list => res.status(200).json(list))
            .catch(err => res.status(403).json({ message: 'YOU SHALL NOT PASS!!!'}))
        } else {
            res.status(403).json({ message: 'Invalid Credentials.'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router