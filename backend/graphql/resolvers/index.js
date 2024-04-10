

// import {userSchema} from "../../models/user";
const User = require("../../models/user");
const Query = {
  helloWorld: () => 'userSchema.find(),',
  getUsers: async () => {
    return User.find();
  },
  getUser: async (parent, {id}) => {
    return User.findById(id);
  }
}



module.exports = {
  Query,
}
