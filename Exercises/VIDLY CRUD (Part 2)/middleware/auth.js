const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Client does not have the authentication...');
    try{const decoded = jwt.verify(token, config.get('jwtPrivateKey')); req.user = decoded; next();}
    catch(err){res.status(400).send('Invalid Token;')}
}

module.exports = auth;