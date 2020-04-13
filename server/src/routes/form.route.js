const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let formController = require('../controllers/form.controller');

router.post('/createform', formController.CreateUpdateForm);
router.post('/getForms', formController.getFormByUserId);
router.post('/fillForm', formController.FillForm);
//router.get('/:idCuestionario', formController.getFormById);
router.get('/:idForm', formController.GetFormQuestions);
router.get('/:idForm/graphs', formController.GetFormGraphs);
router.post('/verifyOwner', formController.VerifyOwner);
router.get('/:idCuestionario/answers', formController.ShowAnswers);
router.get('/:idCuestionario/user/:idUsuario', formController.ShowUserAnswers);

router.delete('/:idFormulario', formController.DeleteForm);

//**** MIDDLEWARE para proteger las rutas ****/
// router.use((req, res, next) => {

//     //Obtenemos el token
//     const token = req.headers['authorization'];

//     //Si hay un token..
//     if (token) {

//         jwt.verify(token, "primerparcialhugo", (err, decoded) => {

//             //Si se mando el token pero es invalido
//             if (err) {
//                 return res.json({ mensaje: 'Token inválida' });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//         //Si no se mando el token
//     } else {
//         res.send({
//             mensaje: 'Token no proveída'
//         });
//     }
// });

module.exports = router;