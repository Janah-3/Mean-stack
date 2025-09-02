const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], minlength: 3 },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  address: {
    city: { type: String },
    country: { type: String }
  }
});

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
