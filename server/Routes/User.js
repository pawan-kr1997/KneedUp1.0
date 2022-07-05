const express = require('express');
const { body } = require('express-validator');

const userController = require('../Controllers/User');
const isAuth = require('../Middleware/auth');

const router = express.Router();

router.post('/signup',
    body('emailId', 'Email id is not valid')
        .trim()
        .isEmail()
        .not()
        .isEmpty(),

    body('password', 'Please enter a password with only numbers and text and atleast 8 characters')
        .trim()
        .isLength({ min: 8 })
        .isAlphanumeric(),

    body('confirmPassword', 'Invalid confirm password')
        .trim()
        .isLength({ min: 8 }),
    userController.signupUser);
router.post('/login',
    body('emailId', 'Email id is not valid')
        .trim()
        .isEmail()
        .not()
        .isEmpty(),
    body('password', 'Please enter a password with only numbers and text and atleast 8 characters')
        .trim()
        .isLength({ min: 8 })
        .isAlphanumeric()
    , userController.loginUser);
router.get('/feeds/category', isAuth, userController.getCategory);
router.post('/feeds/category', isAuth, userController.postCategory);
router.get('/postBookmark/:postId', isAuth, userController.getBookmarks);
router.get('/postUnmark/:postId', isAuth, userController.getUnmarks);
router.get('/bookmark/init', isAuth, userController.initBookmark);
router.post('/password/resetLink',
    body('emailId', 'Email id is not valid')
        .trim()
        .isEmail()
        .not()
        .isEmpty()
    , userController.postPasswordReset);
router.post('/password/resetPassword', [
    body('emailId', 'Email id is not valid')
        .trim()
        .isEmail()
        .not()
        .isEmpty(),

    body('password', 'Please enter a password with only numbers and text and atleast 8 characters')
        .trim()
        .isLength({ min: 8 })
        .isAlphanumeric(),

    body('confirmPassword', 'Invalid confirm password')
        .trim()
        .isLength({ min: 8 })

], userController.postConfirmPasswordReset);
router.get('/bookmark', isAuth, userController.getUserBookmarks);



module.exports = router;