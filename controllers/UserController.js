const logger = require('../logger.js')
const util = require('util')
const passport = require('passport')



const getUserData = (req,res)=>{
      let user = passport.session
      logger.info(`user data : ${user}`)
      res.render('UserData',user) 
}



module.exports = {
  getUserData
}

