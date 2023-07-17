const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");

router.use(userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

module.exports = router;
