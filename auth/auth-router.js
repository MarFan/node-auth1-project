const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        // return user object and login
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  
router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findUserBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.loggedIn = true;
          req.session.userId = user.id;
  
          res.status(200).json({
            message: `Welcome ${user.username}!`,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.get('/logout', (req, res) => {
    if(req.session){
      req.session.destroy(err => {
        if(err){
          res.status().json({ error: 'Unable to logout.'})
        } else {
          res.status(200).json({ message: 'User logged out.'})
        }
      })
    } else {
      res.status(204);
    }
})

module.exports = router;