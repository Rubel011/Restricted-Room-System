const express = require('express');
const { User } = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../Middleware/authentication');
const TokenBlacklist = require('../Models/tokenBlackList');
const blacklistMiddleware = require('../Middleware/blacklistMiddleware');

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
const jwtSecret = process.env.JWT_SECRET || 'masai';

const userRouter = express.Router();

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
userRouter.get("/", async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json({ data: users });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @route   POST /users/register
 * @desc    Register a new user
 * @access  Public
 */
userRouter.post("/register", async (req, res) => {
    try {
        // Extract user information from the request body
        const { email, password, userName } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Email is already registered
            return res.status(400).json({ error: "Email already registered, Use different email or Login" });
        }

        // Hash the password using bcrypt
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                // Handle password hashing error
                return res.status(500).json({ error: "Password hashing failed" });
            }

            // Create a new user document with hashed password
            const newUser = new User({ userName, email, password: hash });

            // Save the new user to the database
            await newUser.save();

            // Respond with a success message
            res.status(201).json({ success: `${newUser.userName} has been registered successfully with _Id-${newUser._id}` });
        });
    } catch (error) {
        // Handle bad request
        res.status(400).json({ error: "Bad request" });
    }
});

/**
 * @route   POST /users/login
 * @desc    Log in user
 * @access  Public
 */
userRouter.post("/login", async (req, res) => {
    try {
        // Extract user information from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret,{expiresIn: "7days" });

        // Respond with a success message and the JWT token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @route   GET /users/profile
 * @desc    Get user profile (protected route)
 * @access  Private
 */
userRouter.get("/profile", authenticateToken, blacklistMiddleware, async (req, res) => {
    try {
        // Access authenticated user data using req.user
        const user = await User.findById(req.user.userId);

        // Respond with user data
        res.status(200).json({ data: user });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }
});


/**
 * @route   POST /users/logout
 * @desc    Log out user and blacklist token
 * @access  Private
 */
userRouter.post('/logout',authenticateToken, blacklistMiddleware, async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.header('Authorization');
        // // Decode the token to get user ID
        const decodedToken = jwt.decode(token);
        
        // Calculate token's expiration date
        const expiry = new Date(decodedToken.exp * 1000);
        
        // Add token to the blacklist collection
        const blacklistToken = new TokenBlacklist({
            token,
            userId: decodedToken.userId,
            expiry
        });
        await blacklistToken.save();
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { userRouter };
