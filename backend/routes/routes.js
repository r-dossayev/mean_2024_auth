const router = require('express').Router();
const isAuth = require('../middlewares/authMiddleware');
const authController = require('../controllers/auth/authController');

const userController = require('../controllers/profile/profileController');

const upload = require('../fileUpload');


router.post('/chat/:user_id',isAuth, upload.single('photo'), userController.sendMessage);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/auth_user', isAuth, authController.authData);
router.get('/user/list', userController.userList);
router.get('/user/:user_id', userController.userProfileWhereId);
router.get('/chat/:user_id',isAuth, userController.loadChats);


module.exports = router;
