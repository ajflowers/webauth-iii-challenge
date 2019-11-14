const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');

const verifyUser = require('../middleware/auth');

router.post('/register', (req, res) => {
    let user = req.body;
    let hash = bcrypt.hashSync(user.password, 12);
    user.password = hash

    Users.add(user)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user.id);

                res.status(200).json({
                    message: `Hello, ${user.username}`,
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid login credentials'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/users', verifyUser, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


function getToken(id) {
    const payload = { sub: id };

    const secret = 'the quick brown fox jumped over the lazy dog';

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;