const OfertaController = require("../controllers/OfertaController")
const AuthenticationShopController = require("../controllers/AuthenticationShopController")

const express = require('express');
const router = express.Router();

router.get('', OfertaController.getOfertas)
router.get('/crear',AuthenticationShopController.protect, OfertaController.createOferta)
router.get('/:id/editar',AuthenticationShopController.protect, OfertaController.editarOferta)
router.get('/search', OfertaController.searchOferta)




module.exports = router;