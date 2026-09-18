import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getDoctors = () => api.get("/doctors");

export const getDoctor = (id) => api.get(`/doctors/${id}`);

export const getAppointments = () => api.get("/appointments");

export const createAppointment = (data) => api.post("/appointments", data);

export const updateAppointment = (id, data) =>
  api.put(`/appointments/${id}`, data);

export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export default api;
