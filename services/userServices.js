const daoUsuarios = require('../Dao/UsuariosDaoMongoDB')
const logger = require('../logger')
const bCrypt = require('../helpers/bCryptHelper')
const util = require('util')



const authenticate = async (username, password) => {
        let dao = new daoUsuarios() 
        let usuario = await dao.getUserByName(username)
    if(!bCrypt.isValidPassword(usuario,password)){
        throw new Error('Invalid Password')
    }
    return usuario
}





const registerUser = async (datosUsuario) => {   
    let newUser
    let msg
 
        let userExists = await verifyName(datosUsuario.username)
        logger.info(`userExists : ${userExists }`)
        if(!userExists){
           newUser = await saveUser(datosUsuario)
           msg = 'EL Usuario ha sido registrado !!'          
        }else{
           msg = 'EL Usuario ya existe !!' 
        }
        return msg
     
    
}



const saveUser = async (user) =>{
    
        let dao = new daoUsuarios() 
        user.password =  bCrypt.createHash(user.password)
        let  newUser = await dao.save(user)
        return newUser
  
}



const verifyName = async (username) => {    
        let dao = new daoUsuarios()
        let user = await dao.getUserByName(username)
        if (user) throw new Error('el nombre de usuario no está disponible')
        return user
   
}





module.exports = {
    authenticate,
    registerUser
}