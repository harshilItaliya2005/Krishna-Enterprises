const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'web')));

// API routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Serve index.html for frontend (SPA fallback)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html', 'index.html'));
});

// Catch-all fallback for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
