const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
require('dotenv').config();
const socketIo = require('socket.io');


mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log("Соединение с базой данных установлено"))
  .catch(err => console.error("Ошибка подключения к базе данных:", err));

const routes = require('./routes/routes');

const app = express();
// const server = http.createServer(app);
const port = process.env.PORT ||8686;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
}));

app.use('/api', routes);
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
// server.listen(3001, () => {
//   console.log(`Server is running on port ${port}`);
// });
