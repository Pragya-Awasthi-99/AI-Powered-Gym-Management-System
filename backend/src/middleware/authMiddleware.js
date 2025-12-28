import jwt from "jsonwebtoken";

/**
 * JWT Authentication Middleware
 * Protects routes by verifying JWT token from Authorization header
 * Adds user information to req.user
 */
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and has Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please provide a valid token.",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object
    // decoded contains: { id, email, role, iat, exp }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    // Handle different JWT error types
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    // Generic error
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};
