const user = require("../models/user");
const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.body; 

    const user = await User.findById(id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}


const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;  

  
    if (updates.password) {
      const bcrypt = require("bcrypt");
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

module.exports = { createUser, getAllUsers ,getById,updateUser, deleteUser};
