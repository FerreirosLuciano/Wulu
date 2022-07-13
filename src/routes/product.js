const AuthenticationUserController = require("../controllers/AuthenticationUserController");
const AuthenticationShopController = require("../controllers/AuthenticationShopController")
const ProductController = require("../controllers/ProductController");
const OfertaController = require("../controllers/OfertaController")
const PagoController = require("../controllers/PagoController");
const FavoritesController = require("../controllers/FavoritesController")
const upload = require("../libs/storage");

const express = require('express');
const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductId);
router.get('/search', ProductController.searchProduct);
router.get('/destacados/search', ProductController.searchProductDestacados);


router.post('/:id/create_favorites', AuthenticationUserController.protect ,FavoritesController.createProductsFavorites);

router.post('/:id_shop/create_product', AuthenticationShopController.protect, PagoController.authenticationPlan, upload.array('imagen'), ProductController.createProduct);

router.post('/:id_shop/oferta',  AuthenticationShopController.protect, PagoController.authenticationPlan ,)
router.post('/:id_shop/oferta/create',  AuthenticationShopController.protect, PagoController.authenticationPlan,OfertaController.createOferta)
router.post('/:id_shop/oferta/:id_oferta/editar',  AuthenticationShopController.protect, PagoController.authenticationPlan, OfertaController.editarOferta)

module.exports = router;