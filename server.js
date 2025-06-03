// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware (checks for API key in headers)
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  // For demonstration, use a hardcoded API key. In production, use env variables.
  if (!apiKey || apiKey !== 'my-secret-api-key') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
});

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

//Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'All product fields are required' });
  }
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// update a product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'All product fields are required' });
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
});

//Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
});



// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 