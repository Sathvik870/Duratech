// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

export default {
    register,
    login,
};