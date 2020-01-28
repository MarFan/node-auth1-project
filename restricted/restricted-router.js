const router = require('express').Router();

const restricted = require('../auth/restircted-middleware');

router.get('/', restricted, (req, res) => {
    res.status(200).json({ message: 'Did you make it?'})
});

router.get('/something', restricted, (req, res) => {
    res.status(200).json({ message: 'Something is out there.'})
});

router.get('/other', restricted, (req, res) => {
    res.status(200).json({ message: 'You will find it, if you go the other way.'})
});

router.get('/a', restricted, (req, res) => {
    res.status(200).json({ message: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'})
});

module.exports = router;