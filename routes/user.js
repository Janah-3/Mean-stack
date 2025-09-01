const express = require("express");
const router = express.Router();
const { getAllUsers, createUser } = require("../controller/userController");

router.get("/get", getAllUsers);
router.post("/create", createUser);

module.exports = router;
 