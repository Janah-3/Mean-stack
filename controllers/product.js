const Product = require("../models/product");


const createProduct = async (req,res)=>{
    try{
      const newProduct = new Product(req.body);
      await newProduct.save();

        res.status(201).json("product created")
    }catch(err){
        res.status(500).json(err)
    }
}


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("customer");
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.body; 

    const product = await Product.findById(id); 

    if (!user) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ product });

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;  


    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;  

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product deleted successfully", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

module.exports = { createProduct, getAllProducts ,getById,updateProduct, deleteProduct};
