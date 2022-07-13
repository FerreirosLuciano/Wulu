const CategoryController = require("../controllers/CategoryController");
const express = require('express');
const router = express.Router();

router.get('/search', CategoryController.searchCategories);


module.exports = router;
