const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
mongoose.connect('mongodb+srv://rysbekdossayev:Laravel5@cluster0.guazwsy.mongodb.net/?retryWrites=true&w=majority',)
  .then(() => console.log("Соединение с базой данных установлено"))
  .catch(err => console.error("Ошибка подключения к базе данных:", err));

const routes = require('./routes/routes');

const app = express();
const port = 8787;

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
