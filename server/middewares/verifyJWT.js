const jwt = require('jsonwebtoken');

module.exports = function verifyJWT(req, res, next) {
    const token = req.headers['token']?.split(' ')[1];
    console.log(token + 'TokeniNVerify');

    if (token) {
        jwt.verify(token, 'tezzsecretkey', (err, decoded) => {
            if (err) {
                res.json({ message: 'Failed to authenticate' });
            } else {
                req.user = { id: decoded.id, email: decoded.email };
                console.log(req.user + 'VERFIEDUSER')
                next();
            }
        });
    } else {
        res.json({ message: 'Missing or invalid token' });
    }
};
