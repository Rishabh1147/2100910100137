import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none'}}>All Products</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;