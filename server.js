const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.hellopython@gmail.com, // Your Gmail address
    pass: process.env.#@Ck3r1234  // Your Gmail app password
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  const { fullName, email, phoneNumber, service, projectDetails } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@mahisagarborewall.com',
    subject: `New Quote Request from ${fullName}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Service Required:</strong> ${service}</p>
      <h3>Project Details:</h3>
      <p>${projectDetails}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 