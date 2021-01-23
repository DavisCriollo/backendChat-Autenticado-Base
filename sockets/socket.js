// const { io } = require('../index');
// const { comprobarJWT } = require('../helpers/jwt');
// const { usuarioConectado, usuarioDesconectado, guarbarMensaje } = require('../controllers/socket');


// // Mensajes de Sockets
// io.on('connection', (client) => {
//         console.log('Cliente conectado');

//         // RECIBO  Token del cliente
//         const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
//         // console.log(client.handshake);
//         if (!valido) {
//             return client.disconnect();
//         }
//         // VERIFICO SI EL CLIENTE ESTÁ AUTENTICADO
//         usuarioConectado(uid);
//         //************************RECORDAR****************************************/
//         //PARA ENVIAR MENSJE TODOS LOS USUARIOS CONETADOS 
//         // io.emit

//         //PARA ENVIAR MENSJE UN USUARIO EN PARTICULAR 
//         // clien.id
//         //****************************************************************/
//         //**************** */ Ingresar al Usuario a una sala especifica  *****/
//         client.join(uid);
//         //**************** */ Escuchar el mensaje emitido por un  Usuario especifico  *****/
//         client.on('mensaje-personal', async(payload) => {
//             // TODO: Grabar mensaje
//             await grabarMensaje(payload);
//             io.to(payload.para).emit('mensaje-personal', payload);
//         });

//         client.on('disconnect', () => {
//             console.log('Cliente desconectado --> :-) ');
//             usuarioDesconectado(uid);
//         });
//     })
//     /************************************************************************/







// ================================== AQUI  ==========================//

const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, guarbarMensaje } = require('../controllers/socket');
// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado !!!!');
    // console.log(client.handshake.headers);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    // console.log(valido, uid);
    // Verificar autenticación
    if (!valido) {
        // console.log('Cliente DESCONECTADO');
        return client.disconnect();
    }
    // console.log('Cliente AUTENTICADO');

    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f298534ad4169714548b785
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
            // TODO: Grabar mensaje
            await guarbarMensaje(payload);
            //  ENVIAR MENSAJE A CLIENTE EN PARTICULAR
            io.to(payload.para).emit('mensaje-personal', payload);
        })
        // client.on('mensaje-personal', (payload) => {
        //     console.log(payload);

    // })


    client.on('disconnect', () => {
        console.log('Cliente DESCONECTADO');
        usuarioDesconectado(uid);
    });




    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});