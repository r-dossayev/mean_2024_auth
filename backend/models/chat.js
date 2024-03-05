const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
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
