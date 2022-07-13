const PlanController = require("../controllers/PlanController");
const PagoController = require("../controllers/PagoController")
const ShopController = require("../controllers/AuthenticationShopController")
const Payment = require("../controllers/PaymentController");
const express = require('express');
const router = express.Router();

router.post('/chekc', /* AuthenticationController.protect, */ Payment.payment);

router.get('/success-update-plan/:id_shop/:id_plan', ShopController.protect, PlanController.UpdatePago);
router.get('/success-create-plan/:id_shop/:id_plan', ShopController.protect, PlanController.CreatePago);

router.get('/validate_pago/:id_shop', ShopController.protect, PagoController.authenticationPlan);



module.exports = router;