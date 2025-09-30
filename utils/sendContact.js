const nodemailer = require('nodemailer');

const sendContactEmail = async (senderName, senderEmail, senderMessage) => {
  // Gmail SMTP Setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  // Email you receive
  const htmlContentToOwner = `
  <div style="max-width:600px;margin:auto;padding:40px;background:linear-gradient(to right,#f0f4f8,#ffffff);
              border-radius:12px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color:#333;
              box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="text-align:center;">
      <img src="https://cdn-icons-png.flaticon.com/512/2950/2950732.png" alt="Contact Icon" width="80" style="margin-bottom:20px;" />
      <h2 style="color:#7c3aed;margin-bottom:10px;">📬 New Contact Form Message</h2>
      <p style="font-size:16px;">Hey Rajesh, someone reached out through your <strong>Portfolio</strong>! 🚀</p>
    </div>

    <div style="margin:30px 0;padding:20px;background:#fafafa;border:1px solid #ddd;border-radius:8px;">
      <p style="font-size:16px;margin:10px 0;"><strong>👤 Name:</strong> ${senderName}</p>
      <p style="font-size:16px;margin:10px 0;"><strong>📧 Email:</strong> ${senderEmail}</p>
      <p style="font-size:16px;margin:10px 0;"><strong>💬 Message:</strong></p>
      <div style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:15px;font-size:15px;white-space:pre-wrap;">
        ${senderMessage}
      </div>
    </div>

    <p style="text-align:center;font-size:14px;color:#555;">
      ✉️ This message came from your Portfolio Contact form.<br>
      If you didn't expect this, you can safely ignore it.
    </p>
    <hr style="margin:40px 0;border:none;border-top:1px solid #ccc;" />
    <p style="font-size:13px;text-align:center;color:#999;">
      © 2025 Rajesh Roshan Portfolio. All rights reserved.
    </p>
  </div>
  `;

  // Confirmation email to visitor
  const htmlContentToVisitor = `
  <div style="max-width:600px;margin:auto;padding:40px;background:#ffffff;
              border-radius:12px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color:#333;
              box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="text-align:center;">
      <img src="https://cdn-icons-png.flaticon.com/512/2950/2950732.png" alt="Contact Icon" width="80" style="margin-bottom:20px;" />
      <h2 style="color:#0a66c2;margin-bottom:10px;">Thanks for reaching out, ${senderName}! 🎉</h2>
      <p style="font-size:16px;">I’ve received your message and will get back to you as soon as possible.</p>
    </div>
    <div style="margin-top:30px;text-align:center;">
      <p style="font-size:14px;color:#555;">
        ⏳ Expected reply time: 1-2 business days.<br/>
        Meanwhile, feel free to check out my portfolio or connect with me on LinkedIn.
      </p>
    </div>
    <hr style="margin:40px 0;border:none;border-top:1px solid #ccc;" />
    <p style="font-size:13px;text-align:center;color:#999;">
      © 2025 Rajesh Roshan Portfolio. All rights reserved.
    </p>
  </div>
  `;

  const mailOptionsOwner = {
    from: `"Rajesh Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    replyTo: senderEmail,
    subject: '📩 New Contact Form Submission',
    html: htmlContentToOwner,
    headers: {
      'X-Powered-By': 'Nodemailer',
      'X-Portfolio-App': 'Rajesh Portfolio Website',
      'X-Mailer': 'Node.js',
      'Date': new Date().toUTCString(),
    },
  };

  const mailOptionsVisitor = {
    from: `"Rajesh Roshan" <${process.env.EMAIL_USER}>`,
    to: senderEmail,
    subject: '✅ Thanks for contacting me!',
    html: htmlContentToVisitor,
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptionsOwner);  // Send to you
    await transporter.sendMail(mailOptionsVisitor); // Send confirmation
    console.log('✅ Both emails sent successfully!');
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    throw new Error('Failed to send contact email.');
  }
};

module.exports = sendContactEmail;
