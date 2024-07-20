import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import ProductList from '../components/ProductList';
import FilterSort from '../components/Filter';
import { getProductsWithFilters } from '../api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: 'Phone', company: 'AMZ', top: 10, page: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsWithFilters(filter.company, filter.category, filter);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [filter]);

  return (
    <Container>
      <FilterSort setFilter={setFilter} />
      {loading ? (
        <CircularProgress />
      ) : (
        <ProductList products={products} />
      )}
    </Container>
  );
}

export default ProductsPage;