const express = require('express')
const authController = require('../controllers/authController')
const { registerValidations } = require('../middlewares/auth')
const route = express.Router()

route.get('/register', authController.register)
route.post('/register', registerValidations , authController.postRegister)
route.get('/login', authController.login)
route.post('/login', authController.postLogin)
route.get('/logout', authController.logout)

module.exports = route
