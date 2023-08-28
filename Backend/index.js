const express = require('express');
const app = express();
const port = process.env.PORT || 1500;
require("dotenv").config();
const { connection } = require('./config/db');
const { userRouter } = require('./Routes/userRoute');
const { roomRouter } = require('./Routes/roomRoute');

// Middleware to parse JSON request bodies
app.use(express.json());

// Home route
app.get("/", async (req, res) => {
    try {
        res.status(200).json({ success: "This is the home page running successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route for user-related endpoints
app.use("/users", userRouter);
app.use("/rooms", roomRouter);

// Start the server
app.listen(port, () => {
    try {
        // Establish database connection
        connection;

        // Server listening message
        console.log({ message: `Server is listening on port ${port}` });
    } catch (error) {
        console.log(error.message);
    }
});
