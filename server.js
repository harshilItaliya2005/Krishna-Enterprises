const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (for web)
app.use(express.static(path.join(__dirname, 'web')));

// Optional: fallback to index.html for single-page apps
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/html', 'index.html'));
});

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
