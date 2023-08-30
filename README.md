# Restricted Room System

Welcome to the Restricted Room System project documentation. This README provides an overview of the project, its functionalities, routes, installation instructions, and technologies used.

## Overview

This project implements a Restricted Room System with functionalities for user registration, login, user authentication, and logout with token blacklisting. Additionally, a scheduled cleaner job is implemented to clean up expired blacklist tokens. The backend is built using Node.js, Express.js, MongoDB with Mongoose, JWT for user authentication, and Nodemailer for sending emails. The frontend components are developed using HTML, CSS, and Vanilla JavaScript.

## Backend

### Functionalities

- User Registration
- User Login and Authentication
- User Logout with Token Blacklisting
- Scheduled Cleaner Job for Expired Blacklist Tokens
- Room Creation
- Room Access Check

### Backend Deployment

The backend of this project is deployed and can be accessed via the following link: [Backend Deployment Link](https://restricted-room.onrender.com/)

### Backend Routes

#### User Routes

- `POST /users/register`: Register a new user.
- `POST /users/login`: Log in and obtain JWT token.
- `POST /users/logout`: Log out user and blacklist token.

#### Room Routes

- `POST /rooms/createRoom`: Create a new chat room.
- `POST /rooms/checkUser`: Check if a user (including admin) is allowed to join a room.

### Installation

To run the backend locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rubel011/Restricted-Room-System.git
   cd Backend ```

2. Install the required npm packages:
    -- npm install

3. Set up environment variables:
    Create a .env file in the root directory and configure the required environment variables like PORT, MONGODB_URI, JWT_SECRET, etc.

4. Start the server:
npm start

Access the backend API at http://localhost:PORT.



### Frontend

## Technologies
The frontend of this project is developed using HTML, CSS, and Vanilla JavaScript.

## Functionalities
- User Interface for Registration and Login
- Access to Restricted Rooms

## Screenshots
- Insert screenshots of your frontend here.

## Installation
To run the frontend locally, follow these steps:

1. Clone the repository:
    ``` bash
    git clone https://github.com/Rubel011/Restricted-Room-System.git
    cd Frontend ```

2. Open index.html in your browser to access the frontend.

## Contributing
Contributions are welcome! Feel free to submit pull requests or report issues.

