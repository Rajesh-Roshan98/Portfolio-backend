const express = require('express');
const dbConnect = require('./config/dbConnect');
const userrouter = require('./routes/contactRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors({ origin: '*', credentials: true }));

// Parse incoming JSON requests
app.use(express.json());

// Prevent favicon 404 noise
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Root / health check route
app.get('/', (req, res) => {
  res.status(200).send('Portfolio-backend API is running ✅');
});

// API routes
app.use('/api/v1', userrouter);

// Connect to Database with retry mechanism
dbConnect();

// Start server only when running locally (Vercel handles serverless deployment)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is active on PORT: ${PORT}`);
  });
}

module.exports = app;
