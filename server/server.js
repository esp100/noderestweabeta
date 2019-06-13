require('./config/config');

const express = require('express');
const app = express();



const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Servicios/Peticiones HTML de tipo GET POST PUT DELETE

app.get('/usuario', function(req, res) {
    res.json('get usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: "El nombre es un parametro necesario"
                /** , err: errors */
        });

        console.log('post Usuario', Error);

    } else {

        res.json({
            persona: body
        });
        console.log('post Usuario');

    }
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        id
    });
    console.log('put Usuario');
});

app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});