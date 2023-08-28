const express = require('express');
const { authenticateToken } = require('../Middleware/authentication');
const { User } = require('../Models/userModel');
const { Room } = require('../Models/roomModel');
const roomRouter = express.Router();


roomRouter.post("/createRoom", authenticateToken, async (req, res) => {
    try {
        const { roomName, allowedEmailIds } = req.body;
        const user = await User.findById(req.user.userId);
        req.user = user;
        const [adminId, adminName, adminEmailId] = [String(req.user._id), req.user.userName, req.user.email]
        const room=new Room({adminId, adminName, adminEmailId,roomName,allowedEmailIds})
        await room.save();

        res.status(200).json({success:"Room created successfully"})

    } catch (error) {
        res.status(404).send({ message: error.message });

    }
})

module.exports = { roomRouter }