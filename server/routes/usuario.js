const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();



//Servicios/Peticiones HTML de tipo GET POST PUT DELETE

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'role estado nombre email google img ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });


        });


});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //funcion Hash gracias a la libreria bcrypt, que se realiza de forma sincrona y realiza siez vueltas 
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    //Escritura en la base  de datos  
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //solucion rapida y mal         usuarioDB.password = null;      pero doy informacion del nombre de la tabla 

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
    /*
        if (body.nombre === undefined) {

            res.status(400).json({
                ok: false,
                mensaje: "El nombre es un parametro necesario"
                    /** , err: errors *
            });

            console.log('post Usuario');

        } else {

            res.json({
                persona: usuario
            });
            console.log('post Usuario');

        }*/
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });
    console.log('put Usuario');
});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;


    Usuario.findById(id, (err, userEncontrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!userEncontrado) {
            console.log('Usuario encontrado null');
            return null;
        } else
        if (userEncontrado.estado === false) {
            val00 = false;
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontró el id *guiño*'
                }
            });
        } else {
            Usuario.findByIdAndUpdate(id, { estado: false }, { new: true },
                (err, usuarioBorrado) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }

                    if (!usuarioBorrado) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: 'Usuario no encontrado'
                            }
                        });
                    }

                    res.json({
                        ok: true,
                        usuario: usuarioBorrado
                    });



                });


        }
    });


    /*
    /////////////Borrado, pero deletea too y eso mal
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });*/


});

module.exports = app;