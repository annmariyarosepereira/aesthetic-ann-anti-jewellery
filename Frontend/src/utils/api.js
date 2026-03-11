import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data)
};

export const productAPI = {
  getAllProducts: (params) => API.get('/products', { params }),
  getProductById: (id) => API.get(`/products/${id}`),
  createProduct: (data) => API.post('/products', data),
  updateProduct: (id, data) => API.put(`/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/products/${id}`),
  addReview: (id, data) => API.post(`/products/${id}/reviews`, data)
};

export const orderAPI = {
  createOrder: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/my-orders'),
  getOrderById: (id) => API.get(`/orders/${id}`),
  getAllOrders: () => API.get('/orders/all'),
  updateOrderStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  verifyPayPalPayment: (data) => API.post('/payments/paypal-pay', data)
};

export const careAPI = {
  addCareItem: (data) => API.post('/care', data),
  getMyCareItems: () => API.get('/care'),
  updateCareItem: (id, data) => API.put(`/care/${id}`, data),
  deleteCareItem: (id) => API.delete(`/care/${id}`)
};

export default API;