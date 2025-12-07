const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ngoSchema = new mongoose.Schema({
  ngoName: { 
    type: String, 
    required: [true, 'Organization name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  verificationStatus: { 
    type: Boolean, 
    default: false 
  },
  role: { 
    type: String, 
    default: "ngo" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Password match method - SIMPLE AND RELIABLE
ngoSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("NGO", ngoSchema);