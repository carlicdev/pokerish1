const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const userControllers = require('../controllers/users');


router.get('/signup', utils.redirectHome, (req, res, next) => res.render('signup'));

router.get('/login', utils.redirectHome, (req, res, next) => res.render('login'));

router.post('/signup', utils.redirectHome, userControllers.user_signup );

router.post('/login', utils.redirectHome, userControllers.user_login);

router.post('/logout', userControllers.user_logout);


module.exports = router;