const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
