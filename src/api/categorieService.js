import api from "./axiosInstance";

const BASE = import.meta.env.VITE_PRODUCTS_BASE_URL;

export const categorieService = {
  getAll: () => api.get(`${BASE}/categories/`),
  getById: (id) => api.get(`${BASE}/categories/${id}/`),
  create: (data) => api.post(`${BASE}/categories/`, data),
  update: (id, data) => api.put(`${BASE}/categories/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/categories/${id}/`),
};

export const productService = {
  getAll: () => api.get(`${BASE}/products/`),
  getById: (id) => api.get(`${BASE}/products/${id}/`),
  create: (data) => api.post(`${BASE}/products/`, data),
  update: (id, data) => api.put(`${BASE}/products/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/products/${id}/`),
};

export const supplierService = {
  getAll: () => api.get(`${BASE}/suppliers/`),
  getById: (id) => api.get(`${BASE}/suppliers/${id}/`),
  create: (data) => api.post(`${BASE}/suppliers/`, data),
  update: (id, data) => api.put(`${BASE}/suppliers/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/suppliers/${id}/`),
};
