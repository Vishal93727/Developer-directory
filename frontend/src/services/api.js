import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDevelopers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.role && filters.role !== 'All') {
    params.append('role', filters.role);
  }
  if (filters.search) {
    params.append('search', filters.search);
  }
  
  const response = await api.get(`/developers?${params.toString()}`);
  return response.data;
};

export const addDeveloper = async (developerData) => {
  const response = await api.post('/developers', developerData);
  return response.data;
};

export default api;