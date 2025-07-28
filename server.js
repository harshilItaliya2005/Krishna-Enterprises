const express = require('express');
const path = require('path');
const app = express();

// Serve all static files from the "web" folder
app.use(express.static(path.join(__dirname, 'web')));

// Route for main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'html', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
