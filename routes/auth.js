/* 
    path:api/login

*/


const { Router } = require('express');
const { check } = require('express-validator');


const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const usuario = require('../models/usuario');

const router = Router();


// CREO LAS RUTAS
/********nuevo usuario****/
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos

], crearUsuario);

/********nuevo usuario****/
router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos

], login);
/********Renueva Token****/
router.get('/renew', validarJWT, renewToken);

module.exports = router;