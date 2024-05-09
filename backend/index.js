const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
require('dotenv').config();
const socketIo = require('socket.io');
const {ApolloServer} = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200',
    'https://studio.apollographql.com', 'https://chat-frontend-1.herokuapp.com'],
}));


const ggFiles = fs.readdirSync(path.join(__dirname, '/graphql/typedefs'));
let typeDefs = '';
ggFiles.forEach(file => {
  typeDefs += fs.readFileSync(path.join(__dirname, '/graphql/typeDefs', file), 'utf-8');
})
const resolvers = require('./graphql/resolvers/index');

let apolloServer = {graphqlPath: '',}

async function startServer() {
  apolloServer = new ApolloServer({typeDefs, resolvers,});
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: '/graphql'});
}

startServer().then(r => console.log('Apollo server started'));

const port = process.env.PORT || 5000;
app.use('/api', routes);
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Chat API",
      version: "0.1.0",
      description:
        "Это документация API для приложения чата",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8787",
        description: "Backend Development server",
      },
      {
        url: "http://localhost:4200",
        description: "Frontend",
      }
    ],
  },
  apis: [
    './swagger/*.js',
  ],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
console.log(`gql server is running on: ${apolloServer.graphqlPath}`);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`gql server is running on http://localhost:${port}/graphql`);
});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('loadNewChat', {
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
      createdAt: data.createdAt,
      photo: data.photo
    });
  });
  socket.on('new_task', (data) => {
    io.emit('loadNewTask', {
      task: {
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        _id: data._id,
        status: data.status,
      }
    });
  },);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});


