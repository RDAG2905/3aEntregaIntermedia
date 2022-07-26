
const express = require('express')
const { Router } = express
const router = Router()
const controller = require('../controllers/SystemController')
const compression = require('compression')


router.get('/info',controller.info)
router.get('/infoZip',compression(),controller.info)


module.exports = router