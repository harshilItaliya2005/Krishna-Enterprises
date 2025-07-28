const express = require('express');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

// ✅ GET all or filtered products
router.get('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const { category } = req.query;

    if (category) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filtered);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error reading product data.' });
  }
});

// ✅ POST new product
router.post('/product', (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const products = JSON.parse(fs.readFileSync(dataPath));

    const newProduct = new Product(
      products.length + 1,
      name,
      category,
      price,
      stock
    );

    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error saving product.' });
  }
});

module.exports = router;
