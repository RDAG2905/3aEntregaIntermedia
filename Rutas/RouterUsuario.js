
const express = require('express')
const { Router } = express
const router = Router()
const userController = require('../controllers/UserController')


router.get('/getUserData',userController.getUserData)

module.exports = router