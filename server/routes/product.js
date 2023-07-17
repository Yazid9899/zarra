const express = require("express");
const ProductController = require("../controllers/productController");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.post("/", authentication, ProductController.createProduct);

router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
