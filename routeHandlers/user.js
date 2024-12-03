const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Secret key for JWT (use environment variables in production)
const JWT_SECRET = "your_jwt_secret";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // Compare passwords (plaintext comparison)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Save token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};
