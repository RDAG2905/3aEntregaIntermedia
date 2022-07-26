const authController = require('../controllers/AuthController')
const getMiliseconds = require('../helpers/getMiliseconds')

const validateSession = (req,res,next)=>{
    try{
        let fecha = getMiliseconds()
        if (req.session.cookie.expires <= fecha) {
            authController.failLoginController
        }else{
            req.session.cookie.expires =  new Date(getMiliseconds() + 600000)
        }
        next()
    }catch(error){
        console.log(error)
        next()
    }
}

module.exports = validateSession;