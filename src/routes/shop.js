const ShopController = require("../controllers/ShopController");
const AuthenticationUserController = require("../controllers/AuthenticationUserController")
const AuthenticationShopController = require("../controllers/AuthenticationShopController")
const CategoryController = require("../controllers/CategoryController");
const FavoritesController = require("../controllers/FavoritesController")

const express = require('express');
const router = express.Router();

router.get('/', ShopController.getShops);
router.get('/:id', ShopController.getShopId);
router.get('/search/:search', ShopController.searchShop);

router.get('/search/:search', CategoryController.searchCategories);


router.post('/:id_shop/create_favorites', AuthenticationUserController.protect, FavoritesController.createShopFavorites);
router.post('/edit', AuthenticationShopController.protect, ShopController.editShop);

module.exports = router;
