const express = require("express");
const router = express.Router();
const { getAllBooks, AddBook } = require("../controller/bookController");

router.get("/get", getAllBooks);
router.post("/add", AddBook);

module.exports = router;
 

