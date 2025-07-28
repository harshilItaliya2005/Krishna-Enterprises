const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'web' folder
app.use(express.static('web'));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
