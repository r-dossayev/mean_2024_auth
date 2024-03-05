const router = require('express').Router();
const isAuth = require('../middlewares/authMiddleware');
const authController = require('../controllers/auth/authController');

const userController = require('../controllers/profile/profileController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout',isAuth, authController.logout);
router.get('/auth_user', isAuth, authController.authData);
router.get('/user/list', userController.userList);
router.get('/user/:user_id', userController.userProfileWhereId);
router.get('/chat/:user_id',isAuth, userController.loadChats);
router.post('/chat/:user_id',isAuth, userController.sendMessage);


module.exports = router;
