// Importing required modules
const express = require('express');
const nodemailer = require('nodemailer'); // Nodemailer to send emails
const bodyParser = require('body-parser'); // Body-parser to parse incoming request bodies
const cors = require('cors'); // CORS middleware to allow cross-origin requests from the frontend
const dotenv = require('dotenv');
const generateInvoice = require('./controller/pdf.controller'); // Import the invoice generator

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Use middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Use CORS to allow cross-origin requests from the frontend
app.use(cors());

// Define the route to generate the PDF invoice and send it via email
app.post('/send-invoice', async (req, res) => {
  const { name, email, items } = req.body;

  try {
    // Generate the invoice PDF and get the file path
    const invoicePath = await generateInvoice(name, email, items);

    // Create a transporter object using Gmail SMTP service
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Replace with your email address
        pass: process.env.PASSWORD // Replace with your email password or app-specific password
      }
    });

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL, // Sender address (your email)
      to: email, // Recipient's email (from request body)
      subject: 'Your Invoice', // Email subject
      text: `Hello ${name}, Please find attached your invoice.`, // Email body
      attachments: [
        {
          filename: `${name}-invoice.pdf`, // Name of the PDF attached to the email
          path: invoicePath // Path to the PDF file on the server
        }
      ]
    };

    // Send the email with the invoice attached
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Invoice sent successfully!' }); // Send success response to frontend
  } catch (error) {
    console.error('Error generating or sending invoice:', error);
    res.status(500).json({ message: 'Error generating or sending invoice.' }); // Send error response to frontend
  }
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000'); // Log a message when the server is running
});
