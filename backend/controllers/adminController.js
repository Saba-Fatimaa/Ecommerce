import Admin from "../models/Admin.js";

// Static email/password for now
const ADMIN_EMAIL = "admin@forever.com";
const ADMIN_PASSWORD = "1234";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check credentials (in real apps, hash and compare)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.status(200).json({ message: "Login successful", admin: true });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
