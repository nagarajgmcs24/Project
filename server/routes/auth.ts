import { RequestHandler } from "express";

// Mock user database (in production, use MongoDB)
const users: any[] = [];

// Mock token generation (in production, use JWT)
function generateToken(): string {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { username, email, password, ward, role } = req.body;

    // Validation
    if (!username || !email || !password || !ward || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find or create user (mock implementation)
    let user = users.find((u) => u.username === username && u.email === email);

    if (!user) {
      // For demo purposes, create user on login (normally would fail)
      user = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        password, // In production, hash this
        ward,
        role,
        createdAt: new Date(),
      };
      users.push(user);
    }

    // Generate token
    const token = generateToken();

    res.json({
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
      ward: user.ward,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const handleSignup: RequestHandler = (req, res) => {
  try {
    const { name, username, email, password, confirmPassword, phone, ward, role } = req.body;

    // Validation
    if (!name || !username || !email || !password || !phone || !ward || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      username,
      email,
      password, // In production, hash this
      phone,
      ward,
      role,
      createdAt: new Date(),
    };
    users.push(user);

    // Generate token
    const token = generateToken();

    res.json({
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
      ward: user.ward,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  // In production, invalidate the token in database
  res.json({ message: "Logged out successfully" });
};
