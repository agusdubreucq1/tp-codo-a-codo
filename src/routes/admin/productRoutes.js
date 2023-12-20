const express = require('express')
const productController = require('../../controllers/admin/productController')
const multer = require("multer")
const { formValidations } = require('../../middlewares/validacionForm')
const upload = multer({ storage: multer.memoryStorage()})

const router = express.Router()


router.get('/', productController.index)

router.get('/create', productController.getCreate)
router.post('/create', upload.array('imagenes', 2),formValidations, productController.create)

router.get('/edit/:id', productController.getEdit)
router.put('/:id', upload.array('imagenes', 2), formValidations, productController.edit)

router.delete('/:id', productController.delete)


module.exports = router