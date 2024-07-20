import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// export const getAllProducts = async (company, category, params) => {
//     const response = await axios.get(`${API_BASE_URL}/categories/${category}/products/` { params });
//     return response.data;
//   };

export const getProductsWithFilters = async (company, category, params) => {
  const response = await axios.get(`${API_BASE_URL}/test/companies/${company}/categories/${category}/products`, { params });
  return response.data;
};

export const getProductById = async (category, productId) => {
  const response = await axios.get(`${API_BASE_URL}/categories/${category}/products/${productId}`);
  return response.data;
};