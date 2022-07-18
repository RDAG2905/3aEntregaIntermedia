const logger = require('../logger.js')
const session = require('express-session')
const daoFactory = require('../Dao/DaoFactory')
const passport = require('passport')
const {notificarRegistro} = require('../helpers/mailSender')
const { createTransport} = require('nodemailer')



const postLogin = (req, res)=> {
  req.session.nombre = req.body.username
  let bienvenida =`Bienvenido ${req.session.nombre}`
  res.render("Home",{bienvenida})
  
}




const getFailLogin = (req, res) =>{
  logger.error('error en login');
  res.sendFile(global.root + '/public/ErrorLogin.html');
}




const postSignup =  async (req, res)=> {
 
  notificarRegistro()
  let success = "Usuario registrado con éxito"
  res.send({ success})
 
 
}




function getFailSignup (req, res) {
  logger.error('error en signup');
  res.sendFile(global.root + '/public/ErrorSignup.html');
}




function getRegisterView (req, res) {
        res.sendFile(global.root + '/public/Register.html');     
}




const logout = (req,res) => {
    let nombre = passport.session.username || 'Desconocido'
    req.session.destroy( err => {      
        if(!err) {
          logger.info(req.session)
          res.render("Despedida",{nombre})
        }
        else res.send({status: 'Logout ERROR', body: err})
    })
}



const info = (req,res) => {
  let argumentos = []
  process.argv.forEach(function (val, index, array) {
    argumentos.push(val)
  })
  let valores =  {
                  arguments : argumentos,
                  plataforma : process.platform,
                  version : process.version,
                  rss : process.memoryUsage().rss,
                  execPath : process.execPath,
                  processId : process.pid,
                  folder : process.cwd(),
                  procesadores : process.env.NUMBER_OF_PROCESSORS
 
                }
  res.render('processInfo',valores)
}




const getUserData = (req,res)=>{
      let user = passport.session
      logger.info(`user data : ${user}`)
      res.render('UserData',user)
      /*let id = user._id
      let factory = new daoFactory("") 
      let dao = factory.getDao()  
      dao.getById(id)
         .then(data =>
             
             res.render('UserData',user)
         )  */      
}


module.exports = {
    postLogin,getFailLogin,getRegisterView,postSignup,getFailSignup,logout,info,getUserData
}