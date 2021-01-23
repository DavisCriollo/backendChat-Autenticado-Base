const jwt = require('jsonwebtoken');



const generaJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                // Error en token
                reject('No se pudo Generar el JWT');
            } else {
                // token correcto
                resolve(token);
            }
        });
    });
}

const comprobarJWT = (token = "") => {
    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}


module.exports = {
    generaJWT,
    comprobarJWT
}