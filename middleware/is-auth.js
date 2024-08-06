const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not Authenticated!');
    error.statusCode = 401;
    throw error;
  }

  const authToken = req.get('Authorization').split(' ')[1];
  let decodeToken;

  try {
    decodeToken = jwt.verify(authToken, 'topsecrettopsecret');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  if (!decodeToken) {
    const error = new Error('Not Authenticated!');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodeToken.user.userId;
};
