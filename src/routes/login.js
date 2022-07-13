const user = require("../controllers/AuthenticationUserController")
const shop = require("../controllers/AuthenticationShopController")
const express = require('express');
const router = express.Router();

router.post("/user-register", user.signup);
router.post("/user-login", user.login);

router.post("/shop-register", shop.signup);
router.post("/shop-login", shop.login);


module.exports = router;