

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    bio: String,
    password: {
        type: String,
        required: true
    },
    is_online:{
      type:String,
      default:"0"
    },
    createdAt: Date
});

module.exports = mongoose.model('User', userSchema);
