import api from "./axiosInstance";

const BASE = import.meta.env.VITE_ORDERS_BASE_URL;

export const orderService = {
  getAll: () => api.get(`${BASE}/orders/`),
  getById: (id) => api.get(`${BASE}/orders/${id}/`),
  create: (data) => api.post(`${BASE}/orders/`, data),
  update: (id, data) => api.put(`${BASE}/orders/${id}/`, data),
  remove: (id) => api.delete(`${BASE}/orders/${id}/`),
};
