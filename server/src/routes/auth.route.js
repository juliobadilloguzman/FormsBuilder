const express = require('express');
const router = express.Router();
var authController = require('../controllers/auth.controller');

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/profile', authController.profile);

module.exports = router;