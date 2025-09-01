const express = require("express");
const router = express.Router();
const { getAllCartItems, AddToCart } = require("../controller/cartController");

router.get("/get", getAllCartItems);
router.post("/add", AddToCart);

module.exports = router;
 

