const router = require('express').Router();
const isAuth = require('../middlewares/authMiddleware');
const authController = require('../controllers/auth/authController');

const userController = require('../controllers/profile/profileController');
const taskController = require('../controllers/task/taskController');

const upload = require('../fileUpload');


router.post('/chat/:user_id',isAuth, upload.single('photo'), userController.sendMessage);
router.get('/test/mail', authController.testMail);
router.post('/task', taskController.createTask);
router.get('/task', taskController.taskList);
router.get('/task/:task_id', taskController.taskWhereId);
router.put('/task/:task_id', taskController.updateTask);
router.delete('/task/:task_id', taskController.deleteTask);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/auth_user', isAuth, authController.authData);
router.get('/user/list', userController.userList);
router.get('/user/:user_id', userController.userProfileWhereId);
router.get('/chat/:user_id',isAuth, userController.loadChats);


module.exports = router;
