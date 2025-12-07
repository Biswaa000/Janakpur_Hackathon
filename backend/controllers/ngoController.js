const NGO = require("../models/NGO");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Register NGO - FIXED VERSION
exports.registerNGO = async (req, res) => {
  try {
    console.log("Registration request received:", req.body);

    const { ngoName, email, password, confirmPassword } = req.body;

    // Input validation
    if (!ngoName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    console.log("Checking if NGO exists with email:", email.toLowerCase().trim());

    // Check if NGO already exists
    const ngoExists = await NGO.findOne({ email: email.toLowerCase().trim() });
    if (ngoExists) {
      return res.status(400).json({
        success: false,
        message: "An organization with this email already exists",
      });
    }

    console.log("Hashing password...");
    
    // Hash password manually before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log("Creating NGO...");

    // Create NGO with hashed password
    const ngo = await NGO.create({
      ngoName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      verificationStatus: false,
      role: "ngo"
    });

    console.log("NGO created successfully with ID:", ngo._id);

    // Generate token for immediate login
    const token = generateToken(ngo._id);

    res.status(201).json({
      success: true,
      message: "Organization registered successfully. Account pending verification.",
      token,
      ngo: {
        id: ngo._id,
        ngoName: ngo.ngoName,
        email: ngo.email,
        verificationStatus: ngo.verificationStatus,
        role: ngo.role,
        createdAt: ngo.createdAt,
      },
    });
  } catch (err) {
    console.error("Registration error details:", {
      name: err.name,
      message: err.message,
      code: err.code,
    });

    // Handle specific Mongoose errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Login NGO - FIXED VERSION
exports.loginNGO = async (req, res) => {
  try {
    console.log("Login request received for email:", req.body.email);

    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    console.log("Finding NGO with email:", email.toLowerCase().trim());

    // Find NGO by email (case insensitive)
    const ngo = await NGO.findOne({ email: email.toLowerCase().trim() });

    if (!ngo) {
      console.log("No NGO found with this email");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("NGO found, checking password for ID:", ngo._id);

    // Check if password matches using bcrypt directly
    const isPasswordValid = await bcrypt.compare(password, ngo.password);

    if (!isPasswordValid) {
      console.log("Password is incorrect");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Password is correct, generating token...");

    // Generate JWT token
    const token = generateToken(ngo._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      ngo: {
        id: ngo._id,
        ngoName: ngo.ngoName,
        email: ngo.email,
        verificationStatus: ngo.verificationStatus,
        role: ngo.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};