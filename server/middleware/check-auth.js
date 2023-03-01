const jwt = require('jsonwebtoken');
const authData = require("../auth");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authData.secString);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!"
    });
  }

}
