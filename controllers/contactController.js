const Contact = require('../models/Contactus');
const sendContactEmail = require('../utils/sendContact');
const dbConnect = require('../config/dbConnect'); // ✅ Import DB connect

const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  const requestId = req.requestId || 'none';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await dbConnect(); // ✅ Ensure DB connection

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    await sendContactEmail(name, email, message); // ✅ Send confirmation email

    res.status(201).json({
      message: 'Contact message submitted successfully & email sent.',
      requestId,
    });
  } catch (error) {
    console.error(JSON.stringify({
      event: 'contact_submission_error',
      requestId,
      error: error.message,
      stack: error.stack,
      body: { name, email, message }
    }));
    res.status(500).json({
      error: error.message || 'Server error',
      requestId,
    });
  }
};

module.exports = { createContact };
