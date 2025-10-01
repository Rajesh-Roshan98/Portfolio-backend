const mongoose = require('mongoose');

const connectWithRetry = async (retries = 5, delay = 3000) => {
  const DB_URL = process.env.DB_URL;

  if (!DB_URL) {
    console.error('❌ DB_URL is not defined in environment variables!');
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(DB_URL); // No deprecated options
      console.log('✅ Database Connected Successfully');
      return;
    } catch (err) {
      console.error(`❌ Database connection attempt ${attempt} failed: ${err.message}`);
      if (attempt < retries) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('❌ All database connection attempts failed!');
        process.exit(1); // Stop server if DB is critical
      }
    }
  }
};

module.exports = connectWithRetry;
