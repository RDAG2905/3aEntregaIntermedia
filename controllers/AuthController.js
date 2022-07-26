const logger = require('../logger.js')
const passport = require('passport')
const util = require('util')


const loginController = passport.authenticate('login', {
    successRedirect: '/successLogin',
    failureRedirect: '/failLogin',
})

 const registroController = passport.authenticate('signup', {
    successRedirect: '/successRegister',
    failureRedirect: '/failRegister',
})


 


function successLogin(req, res) {  
 
   let bienvenida =`Bienvenido ${passport.session.username}`
    if(passport.session.isAdmin){
      res.render("Home",{bienvenida})
    }else{
      res.render("HomeClientes",{bienvenida})
    } 
}





function failLogin(req, res) {
    logger.error('error en login');
    res.sendFile(global.root + '/public/ErrorLogin.html');
}





 function successRegister(req, res) {
    logger.info('req.body : ' + util.inspect(req.body))
    notificarRegistro(req.body)
    let success = "Usuario registrado con éxito"
    res.send({ success})
 }


 
 
 function getRegisterView (req, res) {
    res.sendFile(global.root + '/public/Register.html');     
}





 function failRegister(req, res) {
    logger.error('error en signup');
    res.sendFile(global.root + '/public/ErrorSignup.html');
}






 function logout(req, res) {
    let nombre = passport.session.username || 'Desconocido'
    req.session.destroy( err => {      
        if(!err) {
          logger.info(req.session)
          res.render("Despedida",{nombre})
        }
        else res.send({status: 'Logout ERROR', body: err})
    })
} 





module.exports = {
    registroController,
    loginController,
    successRegister,
    failRegister,
    successLogin,
    failLogin,
    logout,
    getRegisterView
}
