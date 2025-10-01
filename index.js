const express = require('express');
const dbConnect = require('./config/dbConnect');
const userrouter = require('./routes/contactRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://raj-portfolio-one-green.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Health / root route so GET / doesn't return 404 on platforms like Vercel
app.get('/', (req, res) => {
    res.status(200).send('Portfolio-backend API is running');
});

app.use('/api/v1', userrouter);

// Try to connect to DB on startup (works for local and serverless cold start)
dbConnect();

// Start server only when running directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Your server is Active on PORT:${PORT}`);
    });
}

module.exports = app;