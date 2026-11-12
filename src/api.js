import axios from 'axios';

const api = axios.create({
    baseURL: '/backend',
    withCredentials: true,
    withXSRFToken: true,
});

export default api;