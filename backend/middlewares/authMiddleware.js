const jwt = require("jsonwebtoken");
const User = require("../models/user");


const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) return res.status(401).send({
      status: false,
      error: 'unauthenticated'
    });
    const {id} = jwt.verify(token, 'secret');
    if (!id) return res.status(401).send({
      status: false,
      error: 'unauthenticated'
    });
    req.user = await User.findOne({_id: id}).select('-password').exec();
    next();
  } catch (e) {

    return res.status(401).send({
      status: false,
      error: 'unauthenticated'
    });
  }

}

module.exports = isAuth;
