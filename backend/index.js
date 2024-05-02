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

let apolloServer = {
  graphqlPath: '',
}

async function startServer() {

  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({req, res}) => ({req, res})
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({app, path: '/graphql'});
}
startServer()

const port = process.env.PORT || 5000;
app.use('/api', routes);
console.log(`gql server is running on: ${apolloServer.graphqlPath}`);

// server.listen(port, () => {
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`gql server is running on http://localhost:${port}/graphql`);
});
// apolloServer.applyMiddleware({ app, path: '/graphql' });
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
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});


