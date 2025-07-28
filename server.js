const express = require('express');
const path = require('path');

const app = express();

// ✅ Serve static files from "web" folder
app.use(express.static(path.join(__dirname, 'web')));

// ✅ Fallback to index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
