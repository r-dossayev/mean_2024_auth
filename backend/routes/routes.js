const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
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
);

router.post('/login', async (req, res) => {
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
});

router.get('/auth_user', async (req, res) => {

  try {
    const token = req.cookies.jwt_token;
    if (!token) return errorHandler('unauthenticated', req, res, 401)
    const {id} = jwt.verify(token, 'secret');
    if (!id) return errorHandler('unauthenticated', req, res, 401)
    const user = await User.findOne({_id: id}).select('-password').exec();
    res.send({
      status: true,
      data: user
    });
  } catch (e) {
    return errorHandler('unauthenticated', req, res, 401)
  }


});

router.post('/logout', async (req, res) => {

  res.cookie('jwt_token', '', {
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


});


const errorHandler = (errMessage, req, res, code = 500) => {

  return res.status(code).send({
    status: false,
    error: errMessage
  });
}

module.exports = router;
