const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   port: 465,               // true for 465, false for other ports
//   host: "smtp.gmail.com",
//   auth: {
//     user: '1fb87c90a3fc777472976b569fd00074',
//     pass: 'Kaldybek.5',
//   },
//   secure: true,
// });
// const transporter = nodemailer.createTransport({
//   host: 'live.smtp.mailtrap.io',
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: 'api',
//     pass: '152aa737400e4743c884c0cdb1048e2e'
//   }
// })
// const transporter = nodemailer.createTransport({
//   host: "live.smtp.mailtrap.io",
//   port: 587,
//   auth: {
//     user: "api",
//     pass: "152aa737400e4743c884c0cdb1048e2e"
//   }
// });
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "02884051b6fb2d",
    pass: "5ba4c11b86078f"
  }
});
const { MailtrapClient } = require("mailtrap");

const TOKEN = "152aa737400e4743c884c0cdb1048e2e";
const ENDPOINT = "https://bulk.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "dosaev.rysbek5@gmail.com",
    // name: "Rysbek",

  },];

const testMail = async (req, res) => {

  // client.send({
  //   from: sender,
  //   to: recipients,
  //   subject: "You are awesome!",
  //   text: "Congrats for sending test email with Mailtrap!",
  //   category: "Integration Test",
  // }).then(console.log, console.error);
  transporter.sendMail({
    from: 'dosaev.rysbek5@gmail.com',
    to: 'erdasiko@gmail.com',
    subject: 'Test mail',
    text: 'Hello from mailtrap',
  }).then(console.log, console.error);
  res.send('ok')
}
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
  // const randomPassword = generateRandomPassword();
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
  // transporter.sendMail({
  //   from: 'mailtrap@demomailtrap.com',
  //   to: req.body.email,
  //   subject: 'Registration',
  //   text: `Your password is ${randomPassword}`,
  // }).then(console.log, console.error);
  client.send({
    from: sender,
    to: [{email: "dosaev.rysbek5@gmail.com", name: "Rysbek"}],
    subject: "Registration!",
    text: "В вашем сайте новый пользователь"+req.body.email+" зарегистрировался",
    category: "Integration Test",
  }).then(console.log, console.error);
  const {password, ...data} = await result.toJSON();
  res.send(data);
}


const authData = async (req, res) => {
  res.send({
    status: true,
    data: req.user
  });
}
const generateRandomPassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
module.exports = {
  register,
  login,
  logout,
  authData,
  testMail
}
