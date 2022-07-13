const UserController = require("../controllers/UserController")
const AuthenticationUserController = require("../controllers/AuthenticationUserController")
const FavoritesController = require("../controllers/FavoritesController")

const express = require('express');
const router = express.Router();

router.get("/products/favorites", AuthenticationUserController.protect, UserController.getFavoritesProducts);
router.get('/shops/favorites', AuthenticationUserController.protect, UserController.getFavoritesShops);
router.post('/edit', AuthenticationUserController.protect, UserController.editUser);

router.get('/', AuthenticationUserController.protect, UserController.getUsers);
router.get('/:id', AuthenticationUserController.protect, UserController.getUserId);

router.get('/search', FavoritesController.searchFavorites);
module.exports = router;