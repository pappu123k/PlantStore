const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const plantRoutes = require('./routes/plantRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend origin
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/plants', plantRoutes);

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Start server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
