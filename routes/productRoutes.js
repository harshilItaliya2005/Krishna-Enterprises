const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const dataPath = path.join(__dirname, '../data/products.json');

// GET all products
// ✅ GET all or filtered products by category
router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(dataPath));
  const { category } = req.query;

  if (category) {
    const filtered = products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    res.json(filtered);
  } else {
    res.json(products);
  }
});

// POST add a product
router.post('/product', (req, res) => {
  const products = JSON.parse(fs.readFileSync(dataPath));
  const { name, category, price, stock } = req.body;

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
});

module.exports = router;
