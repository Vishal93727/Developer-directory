import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Developer APIs
export const getDevelopers = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.role && filters.role !== 'All') {
    params.append('role', filters.role);
  }
  if (filters.search) {
    params.append('search', filters.search);
  }
  if (filters.sort) {
    params.append('sort', filters.sort);
  }
  if (filters.page) {
    params.append('page', filters.page);
  }
  if (filters.limit) {
    params.append('limit', filters.limit);
  }
  
  const response = await api.get(`/developers?${params.toString()}`);
  return response.data;
};

export const getDeveloper = async (id) => {
  const response = await api.get(`/developers/${id}`);
  return response.data;
};

export const addDeveloper = async (developerData) => {
  const response = await api.post('/developers', developerData);
  return response.data;
};

export const updateDeveloper = async (id, developerData) => {
  const response = await api.put(`/developers/${id}`, developerData);
  return response.data;
};

export const deleteDeveloper = async (id) => {
  const response = await api.delete(`/developers/${id}`);
  return response.data;
};

export default api;