import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const tokenBlacklist = new Set();
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Malformed token" });
    if (tokenBlacklist.has(token))
      return res.status(401).json({
        success: false,
        message: "Token revoked. Please login again.",
      });
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export { tokenBlacklist };
export default authMiddleware;
