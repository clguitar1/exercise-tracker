const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTSecret = process.env.jwtSecret;

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWTSecret);
    // assign the user from the jwt payload to req.user so we can use the id in User.findById(req.user.id) in auth.js
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
