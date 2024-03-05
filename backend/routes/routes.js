const router = require('express').Router();
const isAuth = require('../middlewares/authMiddleware');
const authController = require('../controllers/auth/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout',isAuth, authController.logout);
router.get('/auth_user', isAuth, authController.authData);


module.exports = router;
