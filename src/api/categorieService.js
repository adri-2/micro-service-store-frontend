import api from "./axiosInstance";

const BASE = import.meta.env.VITE_PRODUCTS_BASE_URL;

export const categorieService = {
  getAll: () => api.get(`${BASE}/categories/`),
  getById: (id) => api.get(`${BASE}/categories/${id}/`),
  create: (data) => api.post(`${BASE}/categories/`, data),
  update: (id, data) => api.put(`${BASE}/categories/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/categories/${id}/`),
};
