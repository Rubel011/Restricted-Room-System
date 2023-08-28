const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'masai';

/**
 * Middleware for authenticating JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to continue middleware chain
 */
const authenticateToken = (req, res, next) => {
    // Retrieve token from the Authorization header
    const token = req.header('Authorization');

    // If token is not provided, deny access
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            // If token is invalid, deny access
            return res.status(403).json({ error: "Forbidden - Invalid token" });
        }
        // Store the authenticated user data in the request
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
