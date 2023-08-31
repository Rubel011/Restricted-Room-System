const express = require('express');
const { authenticateToken } = require('../Middleware/authentication');
const { User } = require('../Models/userModel');
const { Room } = require('../Models/roomModel');
const blacklistMiddleware = require('../Middleware/blacklistMiddleware');
const sendEmail_nodemailer = require('../config/nodemailer');
const roomRouter = express.Router();

/**
 * @route   POST /rooms/createRoom
 * @desc    Create a new chat room
 * @access  Private (requires authentication and token blacklisting)
 */
roomRouter.post("/createRoom", authenticateToken, blacklistMiddleware, async (req, res) => {
    try {
        // Destructure request body to get room details
        const { roomName, allowedEmailIds } = req.body;

        // Find user details based on the decoded JWT token
        const user = await User.findById(req.user.userId);
        req.user = user; // Update the user object in the request

        // Extract admin details
        const [adminId, adminName, adminEmailId] = [String(req.user._id), req.user.userName, req.user.email];

        // Create a new Room instance with extracted details
        const room = new Room({ adminId, adminName, adminEmailId, roomName, allowedEmailIds });
        await room.save();

        sendEmail_nodemailer(adminEmailId, `Succesfully created "${roomName}" Room`, `
        You have succesfully created ${roomName} Room
        Room_id:- ${room._id},
        You can join the roomusing Link-- https://restricted-room-system.vercel.app/mainRoom.html?room=${room.id}`)

        if (allowedEmailIds.length > 0) {
            for (let i of allowedEmailIds) {
                sendEmail_nodemailer(i, `You are invited to join the room`, `
            You are invited to join "${roomName}" Room
            Room_id:- "${room._id}",
            You can join the room using Link-- https://restricted-room-system.vercel.app/mainRoom.html?room=${room.id}`)
            }
        }

        // Respond with a success message
        res.status(200).json({ success: "Room created successfully" });
    } catch (error) {
        // Handle errors by sending an error response
        res.status(404).send({ message: error.message });
    }
});


/**
 * @route   POST /rooms/checkUser
 * @desc    Check if a user is allowed to join a room
 * @access  Private (requires authentication and token blacklisting)
 */
roomRouter.post("/checkUser", authenticateToken, blacklistMiddleware, async (req, res) => {
    try {
        // Extract room ID and user's decoded email from the request
        const { roomId } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const userEmail = user.email;

        // Find the room by ID
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Check if the user is the admin or is included in allowedEmailIds
        const isAdmin = userId.toString() === room.adminId.toString();
        const isAllowed = isAdmin || room.allowedEmailIds.includes(userEmail);


        if (isAllowed) {
            if (isAdmin) {
                res.status(200).json({ allowed: true, message: 'Admin is allowed to join the room' });
            } else {
                res.status(200).json({ allowed: true, message: 'User is allowed to join the room' });
            }
        } else {
            res.status(403).json({ allowed: false, message: 'User is not allowed to join the room' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { roomRouter };
