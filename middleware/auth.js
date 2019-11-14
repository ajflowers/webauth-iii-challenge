const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const secret = 'the quick brown fox jumped over the lazy dog';
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'You have no power here.' });
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    } else {
        res.status(400).json({ message: 'You shall not pass!' })
    }
}