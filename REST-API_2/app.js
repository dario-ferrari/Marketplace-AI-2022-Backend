//Express (librería que permite escuchar peticiones)
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');

//incorporo cors (protocolo de manejo)
var cors = require('cors');

//importo router
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/user.route'); //Custom
var utilRouter = require('./routes/utils');
var claseApiRouter = require("./routes/clase.route");
var contratApiRouter = require("./routes/contratacion.route");
var comentApiRouter = require("./routes/comentario.route");

//instancio el servidor
var app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());

//Indico las rutas de los endpoint
app.use('/usuarios', apiRouter);
app.use('/', indexRouter);
app.use('/utils/',utilRouter);
app.use('/clases',claseApiRouter);
app.use('/contrataciones',contratApiRouter);
app.use('/comentarios',comentApiRouter);

//onsole.log("processENV",process.env);
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
    console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
});


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;