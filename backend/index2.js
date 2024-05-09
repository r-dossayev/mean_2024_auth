// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();
// const socketIo = require('socket.io');
// const {ApolloServer} = require('apollo-server-express');
// const fs = require('fs');
// const path = require('path');
//
//
// mongoose.connect(process.env.MONGO_URI,)
//   .then(() => console.log("Соединение с базой данных установлено"))
//   .catch(err => console.error("Ошибка подключения к базе данных:", err));
//
// const app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
//
// app.use(cookieParser());
//
//
// // app.listen(port, () => {
// //   console.log(`app listening at http://localhost:${port}`);
// // });
// console.log(path.join(__dirname, '/graphql/typedefs'), 'dfdfffff')
// const ggFiles = fs.readdirSync(path.join(__dirname, '/graphql/typedefs'));
// let typeDefs = '';
//
// ggFiles.forEach(file => {
//   typeDefs += fs.readFileSync(path.join(__dirname, '/graphql/typeDefs', file), 'utf-8');
//
// })
// const resolvers = require('./graphql/resolvers/index');
//
// let apolloServer = {
//   graphqlPath: '',
// }
//
// async function startServer() {
//
//   apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//     // context: ({req, res}) => ({req, res})
//   });
//   await apolloServer.start();
//
//   apolloServer.applyMiddleware({app, path: '/graphql'});
// }
// startServer()
//
// const port = process.env.PORT || 5000;
// // app.use('/api', routes);
// console.log(`gql server is running on: ${apolloServer.graphqlPath}`);
//
//
// // server.listen(port, () => {
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   console.log(`gql server is running on http://localhost:${port}/graphql`);
// });
//
//
//
