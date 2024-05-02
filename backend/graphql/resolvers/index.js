

// import {userSchema} from "../../models/user";
const User = require("../../models/user");
const Task = require("../../models/task");
const Query = {
  helloWorld: () => 'userSchema.find(),',
  getUsers: async () => {
    return User.find();
  },
  getUser: async (parent, {id}) => {
    return User.findById(id);
  },
  getTasks: async () => {
    return Task.find();
  },
}



module.exports = {
  Query,
}
