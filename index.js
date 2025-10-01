const express = require('express');
const dbConnect = require('./config/dbConnect');
const userrouter = require('./routes/contactRoutes');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors({ origin: '*', credentials: true }));
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Request ID middleware for correlating logs
app.use((req, res, next) => {
    req.requestId = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    res.setHeader('X-Request-Id', req.requestId);
    next();
});

// HTTP access logs
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req[header]'));

// Health / root route so GET / doesn't return 404 on platforms like Vercel
app.get('/', (req, res) => {
    res.status(200).send('Portfolio-backend API is running');
});

app.use('/api/v1', userrouter);

// Try to connect to DB on startup (works for local and serverless cold start)
dbConnect();

// Health endpoint to check DB connectivity
app.get('/api/v1/health', async (req, res) => {
    try {
        await dbConnect();
        res.json({ status: 'ok', db: 'connected', requestId: req.requestId });
    } catch (e) {
        res.status(500).json({ status: 'error', error: e.message, requestId: req.requestId });
    }
});

// Start server only when running directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Your server is Active on PORT:${PORT}`);
    });
}

module.exports = app;