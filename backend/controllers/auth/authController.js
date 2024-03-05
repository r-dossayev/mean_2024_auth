const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const logout = async (req, res) => {

  res.cookie('jwt_token', 'none', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 0,
    expires: new Date(0)
  })
  res.send({
    status: true,
    data: 'logged out'
  })
}

const login = async (req, res) => {
  const user = await User.findOne({email: req.body.email}).exec();
  if (!user) {
    return res.status(404).json({
      status: false,
      error: 'User not found',
    });
  }
  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(404).json({
      status: false,
      error: 'invalid credentials',
    });
  }
  const token = jwt.sign({id: user._id}, 'secret');
  res.cookie('jwt_token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })
  res.send({
    status: true,
    data: user,
  })
}

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(req.body)
  console.log(req.body.password)
  console.log("wwww")
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) {
    return res.status(400).send('Email already exists');
  }
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    createdAt: new Date()
  });

  const result = await user.save();
  const {password, ...data} = await result.toJSON();
  res.send(data);
}


const authData = async (req, res) => {
  res.send({
    status: true,
    data: req.user
  });
}

module.exports = {
  register,
  login,
  logout,
  authData
}
