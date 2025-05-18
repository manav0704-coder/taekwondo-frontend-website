const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Add a route to list available images
app.get('/list-images', (req, res) => {
  const fs = require('fs');
  const imagesDir = path.join(__dirname, '../public/images');
  
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Failed to read images directory' });
    }
    
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    res.json({
      count: imageFiles.length,
      images: imageFiles.map(file => ({
        name: file,
        url: `/images/${file}`
      }))
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Image server running at http://localhost:${PORT}`);
}); 