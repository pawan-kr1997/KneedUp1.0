const express= require('express');

const userController= require('../Controllers/User');
const isAuth= require('../Middleware/auth');

const router= express.Router();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/feeds/category',isAuth, userController.getCategory);
router.post('/feeds/category',isAuth, userController.postCategory);

module.exports= router;