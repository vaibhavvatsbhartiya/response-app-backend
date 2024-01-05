import express from 'express';
import userController from '../controllers/userController.js';
import isAuth from '../middleWare/auth.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.get('/logout', userController.logout);
router.get('/auth', isAuth, userController.authChecker);


export default router;
