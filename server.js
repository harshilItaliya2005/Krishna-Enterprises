const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (for web)
app.use(express.static(path.join(__dirname, 'web')));

// Serve HTML page (home)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html/index.html'));
});

// API Routes (e.g., product routes)
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
