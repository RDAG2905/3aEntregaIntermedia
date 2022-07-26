const express = require('express')
const {Router} = express
const router = Router()

const authController = require('../controllers/AuthController')


router.get('/registerView', authController.getRegisterView);

// registro
router.post('/register', authController.registroController)
router.get('/successRegister', authController.successRegister)
router.get('/failRegister', authController.failRegister)

// login
router.post('/login', authController.loginController)
router.get('/successLogin', authController.successLogin)
router.get('/failLogin', authController.failLogin)

// logout
router.get('/logout', authController.logout)


module.exports = router