const mongoose = require('mongoose');

// Define the Room schema
const roomSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminName: { type: String, required: true },
    adminEmailId: { type: String, required: true },
    roomName: { type: String, required: true },
    allowedEmailIds: [{ type: String}]
}, { versionKey: false });

const Room = mongoose.model('roomData', roomSchema);

module.exports = { Room };