const express= require('express');

const userController= require('../Controllers/User');
const isAuth= require('../Middleware/auth');

const router= express.Router();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/feeds/category',isAuth, userController.getCategory);
router.post('/feeds/category',isAuth, userController.postCategory);
router.get('/postBookmark/:postId', isAuth, userController.getBookmarks);
router.get('/postUnmark/:postId', isAuth, userController.getUnmarks);
router.get('/bookmark/init', isAuth, userController.initBookmark);
router.post('/password/resetLink', userController.postPasswordReset);
router.post('/password/resetPassword', userController.postConfirmPasswordReset);
router.get('/bookmark',isAuth, userController.getUserBookmarks);


module.exports= router;