import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import revokeToken from "../utils/revokeToken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const register = async (req, res) => {
  try {
    const { username, email, password, businessName } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashed,
      businessName,
    });
    return res.json({
      success: true,
      message: "Registered",
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.json({
      success: true,
      token,
      expiresIn: JWT_EXPIRES_IN,
      businessId: user._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    const token = authHeader.split(" ")[1];
    revokeToken(token);
    return res.json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { register, login, logout };
