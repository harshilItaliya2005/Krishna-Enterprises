const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, 'web')));

// Serve index.html for frontend routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
