const SaleController = require("../controllers/SaleController");
const ShopController = require("../controllers/AuthenticationShopController")
const express = require('express');
const router = express.Router();

router.get('/:id_shop/sale/', ShopController.protect, SaleController.getSales);
router.post('/:id_shop/sale/create_sale', ShopController.protect, SaleController.updateSale);
//router.get('/:id_shop/ventas/:id', controllers.editSale);

module.exports = router;