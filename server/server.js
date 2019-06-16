require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//importar las peticiones HTML
app.use(require('./routes/usuario'));



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