import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                <Link to={`/products/${product.category}/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {product.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discount: {product.discount}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;