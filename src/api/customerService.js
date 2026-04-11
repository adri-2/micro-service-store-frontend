import api from "./axiosInstance";

export const customerService = {
  getAll: () => api.get("/customers/"),
  getById: (id) => api.get(`/customers/${id}/`),
  create: (data) => api.post("/customers/", data),
  update: (id, data) => api.put(`/customers/${id}/`, data),
  remove: (id) => api.delete(`/customers/${id}/`),
};
