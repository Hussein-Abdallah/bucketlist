const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const token = req.cookies.token;

  if (!token || token === '') {
    req.isAuthenticated = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
    req.isAuthenticated = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuthenticated = false;
    return next();
  }

  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  return next();
};
