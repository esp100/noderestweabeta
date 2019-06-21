require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//importar las rutas/peticiones HTML a partir de index js
app.use(require('./routes/index'));




//mongo, mongoose connection 
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');

    });
mongoose.set('useCreateIndex', true);



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});