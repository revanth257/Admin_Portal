const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./src/routes/products');
const categoryRoutes = require('./src/routes/category')
const app = express();
const db = require('./src/models/db');
// Load environment variables
dotenv.config({ path: `./environments/.env.${process.env.ENVIRONMENT}` });

const PORT = process.env.PORT || 3000;

// Set view engine and views directory
app.set('view engine', 'pug');
app.set('views', './views');

// Parse JSON bodies
app.use(bodyParser.json());
app.use('/static', express.static('public'));

// Routes
app.use('/products-list', productRoutes);
app.use('/productCategory', categoryRoutes);

// Define home route
app.get('/home', async function (req, res) {
    // Assuming you want to pass some data to the view
    const pageData = { title: 'Home Page' };
    res.render('home', pageData);
});

// Define Product route
app.get('/products', async function (req, res) {
    try {
        // Assuming you want to pass some data to the view
        const pageData = { title: 'category Page' };
        res.render('products', pageData);
    } catch (e) {
        console.error('Error:', e);
        // Handle errors here
        res.status(500).send('Error fetching products');
    }
});


// Define category route
app.get('/category', async function (req, res) {
    // Assuming you want to pass some data to the view
    const pageData = { title: 'category Page' };
    res.render('category', pageData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening at ${process.env.APP_URL}`);
});