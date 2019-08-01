//=============================
//Puerto 
//=============================

process.env.PORT = process.env.PORT || 3000;

//=============================
//Entorno 
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=============================
//Vancimiento del Token 
//=============================
// 60 segunddos 
// 60 minutos 
// 24 horas 
// 30 días
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || 60 * 60 * 24 * 30 * 10;

//=============================
//SEED de autenticación  
//=============================
// TODO: delete la wea opciones de tokens to produc
process.env.SEED = process.env.SEED;

//=============================
//URL Base de Datos 
//=============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_URL;

}

process.env.URLDB = urlDB;


//=============================
//Google Client ID 
//=============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1005337548177-6k5nt1q6mdjun71g8jh062cnlaghtt5i.apps.googleusercontent.com';