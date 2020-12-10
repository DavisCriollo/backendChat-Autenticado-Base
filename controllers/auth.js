const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

// NUEVO USUARIO
const crearUsuario = async(req, res = response) => {

        const { email, password, nombre } = req.body;
        try {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Correo ya existe'
                });
            }

            const usuario = new Usuario(req.body);

            // EMCRIPTAR CONTRASEÑA

            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            await usuario.save();


            // GENERO UN JWT

            const token = await generaJWT(usuario.id);


            res.json({
                ok: true,
                usuario,
                token
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Hable con eladministrador"
            });
        }



    }
    // LOGIN
const login = async(req, res = response) => {
    try {
        const { email, password } = req.body;

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // VALIDAR EL PASSWORD

        const validaPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La Contraseña no es válida'
            });
        }

        // Genera JWT
        const token = await generaJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}

const renewToken = async(req, res = response) => {


    // recupero uid del usuario

    const uid = req.uid;
    //  generar un nuevo JWT
    const token = await generaJWT(uid);
    // Obtener el usuario por el UID
    const usuario = await Usuario.findById(uid);


    res.json({
        ok: true,
        usuario,
        token
    });
}



module.exports = {
    crearUsuario,
    login,
    renewToken
}