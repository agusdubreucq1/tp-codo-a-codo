const express = require("express")
const categoriaController = require("../../controllers/admin/categoriaController")

const router = express.Router()

router.get('/', categoriaController.index)

router.get('/create', categoriaController.getCreate)
router.post('/', categoriaController.create)

router.get('/edit/:id', categoriaController.getEdit)
router.put('/:id', categoriaController.edit)

router.delete('/:id', categoriaController.delete)


module.exports = router