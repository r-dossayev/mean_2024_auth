

// import {userSchema} from "../../models/user";
const User = require("../../models/user");
const Query = {
  helloWorld: () => 'userSchema.find(),',
  getUsers: async () => {
    return await User.find();
  },
  getUser: async (parent, {id}) => {
    return await User.findById(id);
  }
}



module.exports = {
  Query,
}
