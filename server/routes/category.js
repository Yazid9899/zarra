const express = require("express");
const CategoryControlller = require("../controllers/categoryController");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.get("/", CategoryControlller.getAllCategory);
router.post("/", authentication, CategoryControlller.createCategory);
router.delete("/:id", authentication, CategoryControlller.deleteCategory);

module.exports = router;
