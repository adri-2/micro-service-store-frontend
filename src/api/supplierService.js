import api from "./axiosInstance";

const BASE = import.meta.env.VITE_PRODUCTS_BASE_URL;

export const supplierService = {
  getAll: () => api.get(`${BASE}/suppliers/`),
  getBy: (id) => api.get(`${BASE}/suppliers/${id}/`),
  create: (data) => api.post(`${BASE}/suppliers/`, data),
  update: (id, data) => api.put(`${BASE}/suppliers/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/suppliers/${id}/`),
};
