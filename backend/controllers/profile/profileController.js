const User = require('../../models/user');
const Chat = require('../../models/chat');
// const { Op } = require('sequelize');


const userProfileWhereId = async (req, res) => {
  const id = req.params.user_id;
  console.log(id)
  try {
    const user = await User.findOne({_id: id}).select('-password').exec();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (e) {
    res.status(500).json({message: 'Server error'});
  }
}

const loadChats = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.user_id;
  try {
    const chats = Chat.find({senderId: senderId, receiverId: receiverId}).exec();
    res.status(200).json(chats);
  } catch (e) {
    res.status(500).json({message: 'Server error'});
  }

}

const sendMessage = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.user_id;
  const message = req.body.message;
  try {
    const chat = await Chat.create({
      senderId: senderId,
      receiverId: receiverId,
      message: message
    });
    console.log(chat)
    res.status(200).json(chat);
  } catch (e) {
    res.status(500).json({message: 'Server error'});
  }
}


const userList = async (req, res) => {
  try {
    //exclude  password from the list
    const users = await User.find({}).select('-password').exec();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({message: 'Server error'});
  }
}

module.exports = {
  userProfileWhereId,
  sendMessage,
  loadChats,
  userList
};
