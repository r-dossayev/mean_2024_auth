const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
require('dotenv').config();
const socketIo = require('socket.io');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // region: 'eu-central-1'
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});




mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log("Соединение с базой данных установлено"))
  .catch(err => console.error("Ошибка подключения к базе данных:", err));

const routes = require('./routes/routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 8686;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
}));

app.use('/api', routes);
// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`);
// });
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('loadNewChat', {message: data.message, senderId: data.senderId, receiverId: data.receiverId, createdAt: data.createdAt, photo: data.photo});
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});


