const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        'jwtSign' // JWT Secret must be stored inside a ENV variable
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2M2I1YTQ0NzgyNmNlM2ZiY2I0YjJjZGMiLCJpYXQiOjE2NzI4NTAxMzh9.V-K8o-3nDU1hUYlJJWuvUAXG4CVG3ZnLP0QRqvCIZeg";
    const accessToken = tempToken;

    // Since the cookie didn't work a temp token has been declared
    // const accessToken = req.cookies['access-token'];

    if(!accessToken) return res.status(400).json({error: 'User not Authenticated'});

    // After accessing the token, validate the required components are inside the token
    try{
        const validToke = verify(accessToken, 'jwtSign');
        if(validToke){
            req.authenticated = true;
            return next();
        }
    }catch(err){
        return res.status(400).json({error: err});
    }
};

module.exports = {createTokens, validateToken};