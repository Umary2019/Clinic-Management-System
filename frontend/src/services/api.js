import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  profile: () => api.get('/auth/profile'),
};

export const patientAPI = {
  list: (params) => api.get('/patients', { params }),
  create: (payload) => api.post('/patients', payload),
  update: (id, payload) => api.put(`/patients/${id}`, payload),
  remove: (id) => api.delete(`/patients/${id}`),
  history: (id) => api.get(`/patients/${id}/history`),
};

export const doctorAPI = {
  list: () => api.get('/doctors'),
  create: (payload) => api.post('/doctors', payload),
};

export const appointmentAPI = {
  list: (params) => api.get('/appointments', { params }),
  create: (payload) => api.post('/appointments', payload),
  updateStatus: (id, payload) => api.patch(`/appointments/${id}/status`, payload),
};

export const recordAPI = {
  create: (payload) =>
    api.post('/records', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  byPatient: (patientId) => api.get(`/records/${patientId}`),
};

export const billingAPI = {
  create: (payload) => api.post('/billing', payload),
  list: (params) => api.get('/billing', { params }),
  updateStatus: (id, payload) => api.patch(`/billing/${id}/status`, payload),
};

export const dashboardAPI = {
  admin: () => api.get('/dashboard/admin'),
  doctor: (doctorId) => api.get('/dashboard/doctor', { params: { doctorId } }),
  receptionist: () => api.get('/dashboard/receptionist'),
};

export default api;
