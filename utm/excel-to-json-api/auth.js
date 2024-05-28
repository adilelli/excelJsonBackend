const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send('No token provided.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send('Token format is incorrect.');
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(500).send('Failed to authenticate token.');
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
