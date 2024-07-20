const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const productCache = [];

const getAllProducts = async (category, n, page, sortBy, sortOrder) => {
    const apiResponses = [];

    // Simulate fetching data
    for (let i = 0; i < 5; i++){
        apiResponses.push({
            //Pushing random data in the array.
            company: `E-Commerce ${i + 1}`,
            products: Array.from({ length: 50 }, (_, index) => ({
                id: `${category}-${i}-${index + 1}`,
                name: `Product ${index + 1}`,
                rating: Math.random() * 5,
                price: Math.round(Math.random() * 100),
                discount: Math.random() * 50,
            })),
        });
    }

    //Sort the products based on the given sort parameters
    const allProducts = apiResponses.flatMap(api => api.products);

    allProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });
    const startIndex = (page - 1) * n;
    const endIndex = page * n;

    // Return the sliced array
    return allProducts.slice(startIndex, endIndex);
};

// Route to get top 'n' products
//Route: http://localhost:5173/categories/laptop/products?n=10
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    let { n = 10, page = 1, sortBy = 'rating', sortOrder = 'desc' } = req.query;

    n = parseInt(n, 10);
    page = parseInt(page, 10);

    if (n > 10) {
        // Enforce pagination if 'n' exceeds 10
        if (!req.query.page) {
            return res.status(400).json({ error: "Pagination is required when 'n' exceeds 10. Please provide a 'page' parameter." });
        }
    }

    try {
        const products = await getAllProducts(categoryname, n, page, sortBy, sortOrder);
        res.json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

const getCompanySpecificFilteredProducts = async (company, category, n, page, sortBy, sortOrder, minPrice, maxPrice) => {
    
    const apiResponses = [];
    apiResponses.push({
        company: company,
        products: Array.from({ length: 50 }, (_, index) => {
            const price = Math.random() * 10000;
            return {
                id: `${category}-${company}-${index + 1}`,
                name: `Product ${index + 1}`,
                rating: Math.random() * 5,
                price: price,
                discount: Math.random() * 50,
            };
        }).filter(product => product.price >= minPrice && product.price <= maxPrice)
    });

    // Sort the products based on the given sort parameters
    const allProducts = apiResponses.flatMap(api => api.products);

    allProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });
    const startIndex = (page - 1) * n;
    const endIndex = page * n;

    // Return the sliced array
    return allProducts.slice(startIndex, endIndex);
};

// Route to get top 'n' products within a category and company
//Route: http://localhost:5173/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000"
app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    const { companyname, categoryname } = req.params;
    let { top = 10, page = 1, sortBy = 'rating', sortOrder = 'desc', minPrice = 0, maxPrice = Infinity } = req.query;
    top = parseInt(top, 10);
    page = parseInt(page, 10);
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    if (top > 10 && !req.query.page) {
        return res.status(400).json({ error: "Pagination is required when 'top' exceeds 10. Please provide a 'page' parameter." });
    }

    try {
        const products = await getCompanySpecificFilteredProducts(companyname, categoryname, top, page, sortBy, sortOrder, minPrice, maxPrice);
        res.json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});
// Route to get details of a specific product
//Route: http://localhost:5173/categories/:categoryname/products/:productid
app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { categoryname, productid } = req.params;

    const product = productCache[productid];
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on:${port}`);
});