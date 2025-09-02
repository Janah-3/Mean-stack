const express= require("express")
const router = express.Router()
const { createProduct , getAllProducts, getById,updateProduct,deleteProduct } = require("../controllers/product")


router.get("/get", getAllProducts);   
router.post("/add", createProduct);   
router.get("/getById", getById);
router.put("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)

module.exports = router