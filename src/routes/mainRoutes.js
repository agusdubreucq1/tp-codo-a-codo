const express = require("express")
const mainController = require("../controllers/mainController")
const router = express.Router()

router.get('/', mainController.index)
router.get('/home', mainController.home)
router.get('/contact', mainController.contact)
router.get('/about', mainController.about)
router.get('/faqs', mainController.faqs)
router.get('/shop', mainController.shop)
router.get('/item/:id', mainController.item)
router.get('/cart', mainController.cart)

module.exports = router