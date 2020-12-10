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



module.exports = {
    generaJWT
}