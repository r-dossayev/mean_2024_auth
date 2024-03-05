const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({

    senderId: {
      type: String,
      required: true,
      ref: 'User'
    },
    receiverId: {
      type: String,
      required: true,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: String,
      default: "0"
    },
  }
  , {timestamps: true});

module.exports = mongoose.model('Chat', chatSchema);
