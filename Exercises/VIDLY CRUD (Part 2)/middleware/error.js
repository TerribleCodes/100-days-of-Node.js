const winston = require('winston');
const error_handle = function(error, req, res, next){
    winston.error(error.message, error);
    //error
    //warning
    //info
    //verbose
    //debug
    //silly
    res.status(500).send('Internal server error');
  };

module.exports = {error_handle};
