const express= require('express');

const postController= require('../Controllers/Post');
const isAuth= require('../Middleware/auth');

const extractNewsMidd = require('../Middleware/NewsMiddleware/extractNews');
const uploadNewsMidd= require('../Middleware/NewsMiddleware/uploadNews');

const extractIdsaMidd = require('../Middleware/IdsaMiddleware/extractData');
const uploadIdsaMidd= require('../Middleware/IdsaMiddleware/uploadData');

const extractNitiMidd = require('../Middleware/NitiMiddleware/extractData');
const uploadNitiMidd= require('../Middleware/NitiMiddleware/uploadData');

const extractPresidentMidd = require('../Middleware/PresidentMiddleware/extractData');
const uploadPresidentMidd= require('../Middleware/PresidentMiddleware/uploadData');

const extractPressMidd = require('../Middleware/PressMiddleware/extractData');
const uploadPressMidd= require('../Middleware/PressMiddleware/uploadData');

const extractPRSMidd = require('../Middleware/PrsMiddleware/extractData');
const uploadPRSMidd= require('../Middleware/PrsMiddleware/uploadData');



const router= express.Router();

//router.post('/newsOnAir', postController.initSource);
//router.post('/idsa', postController.initSource);
//router.post('/niti', postController.initSource);
//router.post('/president', postController.initSource);
//router.post('/press', postController.initSource);
//router.post('/prs', postController.initSource);



router.get('/newsOnAir/:category', extractNewsMidd, uploadNewsMidd, postController.getNewsPost);
router.get('/idsa/:category', extractIdsaMidd, uploadIdsaMidd, postController.getIdsaPost);
router.get('/nitiAayog/:category', extractNitiMidd, uploadNitiMidd, postController.getNitiPost);
router.get('/presidentOfIndia/:category', extractPresidentMidd, uploadPresidentMidd, postController.getPresidentPost);
router.get('/pressInformationBureau/:category', extractPressMidd, uploadPressMidd, postController.getPressPost);
router.get('/prsIndia/:category', extractPRSMidd, uploadPRSMidd, postController.getPRSPost);



module.exports= router;