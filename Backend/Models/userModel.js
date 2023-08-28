const mongoose = require('mongoose');

// Define the user schema using Mongoose
const userSchema = mongoose.Schema({
    // User's username, required field
    userName: { type: String, required: true },
    // User's email, required field
    email: { type: String, required: true },
    // User's password, required field
    password: { type: String, required: true }
}, {
    // Exclude the version key ('__v') from documents
    versionKey: false
});

// Create a User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = { User };
