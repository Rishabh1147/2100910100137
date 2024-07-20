import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function FilterSort({ setFilter }) {
  const [category, setCategory] = useState('laptop');
  const [n, setN] = useState(4);

  const handleFilter = () => {
    setFilter({ category, n });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Number of Products"
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Apply
        </Button>
      </Grid>
    </Grid>
  );
}

export default FilterSort;