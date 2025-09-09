const express = require('express');
const chalk = require('chalk');
const path = require('path');

const app = express();
const port = 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home',
    message: 'Welcome to our Supply Chain Demo!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    team: [
      { name: 'John Doe', role: 'CEO' },
      { name: 'Jane Smith', role: 'CTO' },
      { name: 'Bob Johnson', role: 'Lead Developer' }
    ]
  });
});

app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Our Products',
    products: [
      { id: 1, name: 'Product A', price: 99.99 },
      { id: 2, name: 'Product B', price: 149.99 },
      { id: 3, name: 'Product C', price: 199.99 }
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(chalk.red('Error:'), err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server running at http://localhost:${port}`));
});
