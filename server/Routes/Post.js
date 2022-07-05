const express= require('express');

const postController= require('../Controllers/Post');

const extractNewsMidd = require('../Middleware/NewsMiddleware/extractNews');
const extractIdsaMidd = require('../Middleware/IdsaMiddleware/extractData');
const extractNitiMidd = require('../Middleware/NitiMiddleware/extractData');
const extractPresidentMidd = require('../Middleware/PresidentMiddleware/extractData');
const extractPressMidd = require('../Middleware/PressMiddleware/extractData');
const extractPRSMidd = require('../Middleware/PrsMiddleware/extractData');

const uploadDataMiddleware= require('../Middleware/uploadData');

const router= express.Router();

//router.post('/newsOnAir', postController.initSource);
//router.post('/idsa', postController.initSource);
//router.post('/niti', postController.initSource);
//router.post('/president', postController.initSource);
//router.post('/press', postController.initSource);
//router.post('/prs', postController.initSource);


router.get('/newsOnAir/:category', extractNewsMidd, uploadDataMiddleware, postController.getPosts);
router.get('/idsa/:category', extractIdsaMidd, uploadDataMiddleware, postController.getPosts);
router.get('/nitiAayog/:category', extractNitiMidd, uploadDataMiddleware, postController.getPosts);
router.get('/presidentOfIndia/:category', extractPresidentMidd, uploadDataMiddleware, postController.getPosts);
router.get('/pressInformationBureau/:category', extractPressMidd, uploadDataMiddleware, postController.getPosts);
router.get('/prsIndia/:category', extractPRSMidd, uploadDataMiddleware, postController.getPosts);

module.exports= router;