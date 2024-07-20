import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@mui/material';
import { getProductById } from '../api';

function ProductDetailPage() {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(category, productId);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [category, productId]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">Company: {product.company}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Rating: {product.rating}</Typography>
          <Typography variant="body1">Discount: {product.discount}%</Typography>
          <Typography variant="body1">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
        </>
      )}
    </Container>
  );
}

export default ProductDetailPage;