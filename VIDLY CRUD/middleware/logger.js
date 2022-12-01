const opt = require('debug')('app:startup')

function login(req, res, next){
    opt("Initializing...");
    next();
}

module.exports = login;