const express = require("express");
const { getAllUsers, createUser,getById,updateUser,deleteUser} = require("../controllers/user");
const router = express.Router();


router.get("/get", getAllUsers);   
router.post("/add", createUser);   
router.get("/getById",getById)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)


module.exports = router;
