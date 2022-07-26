const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bCrypt = require('../helpers/bCryptHelper')
const { autenticar,registerUser } = require('../services/userServices')
const logger = require('../logger')


  passport.use('signup', new LocalStrategy({
    passReqToCallback: true },
 
    async(req, username, password, done) => {

      try {
        const datosUsuario = req.body
        const user = await registerUser(req.body)
        logger.info(`user register passport : ${user}`);    
        let info
        if (user) {
          info ='User already exists'
          logger.info(info);        
        }
        info = 'Successfully created user'
        return done(null, false, info)
       
        
    } catch (error) {
        done(error)
       
    }  
  }))


  passport.use('login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err)
          return done(err);
  
        if (!user) {
          logger.info('User Not Found with email ' + username);
          return done(null, false);
        }
  
        if (!bCrypt.isValidPassword(user, password)) {
          logger.info('Invalid Password');
          return done(null, false);
        }
        logger.info(`__dirname: ${__dirname}`)
        passport.session = user
       
       
        return done(null, user);
      });
    })
  );
  


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });
  

  const passportMiddleware = passport.initialize()
  const passportSessionHandler = passport.session()

  
  module.exports = {
    passportMiddleware,
    passportSessionHandler
  }