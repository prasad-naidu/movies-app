const jwt = require('jsonwebtoken');
const HTTP = require('http-status')
const config = require('../../config/config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(HTTP.UNAUTHORIZED).send({
            error: 'Access denied. Token not provided'
        })
    }
    try {
        const decode = jwt.verify(token, config.JWT_SECRET);
        req.user = decode;
        next();
    } catch (e) {
        return res.send(HTTP.BAD_REQUEST).send({
            error: 'invalid token'
        });
    }
}

module.exports = auth;