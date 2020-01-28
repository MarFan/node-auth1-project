const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

module.exports = function restricted(req, res, next) {
    const { username, password } = req.headers;

    // if(username && password) {
    //     Users.findUserBy({username})
    //     .first()
    //     .then(user => {
    //         if(user && bcrypt.compareSync(password, user.password)) {
    //             next();
    //         } else {
    //             res.status(403).json({ message: 'Invalid Credentials.'})
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // } else {
    //     res.status(400).json({ message: 'Please provide valid credentials'});    
    // }

    if (req.session && req.session.user){
        next();
    } else {
        res.status(400).json({ message: 'Please provide valid credentials'});
    }
}