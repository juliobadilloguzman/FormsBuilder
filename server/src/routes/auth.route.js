const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let authController = require('../controllers/auth.controller');

router.post('/login', authController.login);

router.post('/signup', authController.signup);

//**** MIDDLEWARE para proteger las rutas ****/
router.use((req, res, next) => {

    //Obtenemos el token
    const token = req.headers['authorization'];

    //Si hay un token..
    if (token) {

        jwt.verify(token, "primerparcialhugo", (err, decoded) => {

            //Si se mando el token pero es invalido
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

        //Si no se mando el token
    } else {
        res.send({
            mensaje: 'Token no proveída'
        });
    }
});

router.get('/profile', router, authController.profile);

module.exports = router;