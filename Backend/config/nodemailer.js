const nodemailer = require('nodemailer');

// Assuming you have the following variables defined in your environment
const senderEmail = process.env.vetspotEmail;
const senderSmtpPass = process.env.vetspotPassword;

function sendEmail_nodemailer(toEmail,subject,text){
     // Define the email content
     const emailContent = {
        to: toEmail,
        from: senderEmail, // Use the sender's email here
        subject: subject,
        text: text
    };

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderSmtpPass
        }
    });

    // Send the email
    transporter.sendMail(emailContent, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = sendEmail_nodemailer