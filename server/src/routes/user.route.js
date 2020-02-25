const express = require('express');
const router = express.Router();
var userController = require('../controllers/user.controller');

router.get('/getUser', userController.obtenerUsuario);

module.exports = router;