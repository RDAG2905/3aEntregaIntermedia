const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const validateSession = require('./middlewares/validateSession')
const getMiliseconds = require('./helpers/getMiliseconds')
//const controller = require('./controllers/UserController')
const getSession= require('./helpers/getSession')

const User = require('./models/User');
const Db = require('./controllers/DbController')
const config = require('config');

const bCrypt = require('./helpers/bCryptHelper')
let util = require('util');
const parseArgs = require('minimist');
const dotenv = require('dotenv').config()
const randomRouter = require('./Rutas/RandomRouter')
const routerProductos = require('./Rutas/RouterProductos')
const routerCarrito = require('./Rutas/RouterCarrito')
const routerPedidos = require('./Rutas/RouterPedidos')
const routerUsuarios = require('./Rutas/RouterUsuario')
const routerSystem = require('./Rutas/SystemRouter')
const routerAuth = require('./Rutas/AuthRouter')
const cluster = require('cluster')
const {cpus} = require('os')

let PORT = process.env.PORT
const modoCluster = process.argv[4] == 'CLUSTER'

const logger = require('./logger.js')
const uploadFilesRouter = require('./Rutas/uploadFileRouter.js')
const path = require('path')


global.root = __dirname;
global.adminEmail = "tyrel.ullrich@ethereal.email"
global.celAdmin = "+5491125111726"

const { passportMiddleware,passportSessionHandler} = require('./middlewares/passport')

  
 
  /////////////////////////////////////
  /// Definiendo el número de procesos
  ////////////////////////////////////

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length

    logger.info(`Número de procesadores: ${numCPUs}`)
    logger.info(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
         logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    })


} else {

const app = express()
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb',extended:true}));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "/files")));


const handlebars = require('express-handlebars')    
const { header, redirect } = require('express/lib/response')

app.engine(
    "hbs",
    handlebars.engine({
        etname: ".hbs",
        defaultLayout : "layout.hbs",
        layoutsDir: __dirname + "/public/layouts",
        partialsDir: __dirname + "/public/plantillas"
    })
)

app.set("views","./public/plantillas")
app.set("view engine","hbs")


app.use(cookieParser())
app.use(getSession)

app.use(passportMiddleware)
app.use(passportSessionHandler)

///////////////////////////////////////////////////////////////////////
/*         Middleware para verificar si la sesión expiró           */

app.use(validateSession)

//////////////////////////////////////////////////////////////////////


/////////////////////

app.use('/api/randoms',randomRouter)
app.use('', routerAuth)
app.use('/api/usuarios',routerUsuarios)
app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)
app.use('/api/pedidos',routerPedidos)
app.use('/files', uploadFilesRouter)
app.use('/api/system',routerSystem)

///////////// Manejo de rutas no implementadas ////////////////

app.use((req, res, next) => {
  const { url, method } = req
  const respuesta = `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
  res.status(404).send(respuesta)
});


///////////// Manejo de errores global ////////////////

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Ocurrió un Error. Consulte con el administrador del sistema');
 });
 



//Db.conectarDB(process.env.MONGOATLASCONNECTION, err => {  
Db.conectarDB(process.env.MONGODB, err => { 
    if (err) 
    logger.error(`error en conexión de base de datos : ${err}`)
    else
    logger.info('BASE DE DATOS CONECTADA');
})


app.listen(PORT, () => {    
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})

app.on('error', error => logger.error(`Error en servidor: ${error}`))

}