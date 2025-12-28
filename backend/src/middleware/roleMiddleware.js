/**
 * Role-Based Access Control Middleware
 * Restricts route access to specific roles
 * Must be used after protect middleware
 * 
 * @param {...string} roles - Allowed roles (ADMIN, TRAINER, USER)
 * @returns {Function} Express middleware function
 * 
 * @example
 * router.get('/admin-only', protect, restrictTo('ADMIN'), handler)
 * router.get('/trainer-access', protect, restrictTo('ADMIN', 'TRAINER'), handler)
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated (should be set by protect middleware)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first.",
      });
    }

    // Check if user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You don't have permission to access this resource.",
        requiredRoles: roles,
        yourRole: req.user.role,
      });
    }

    next();
  };
};
  