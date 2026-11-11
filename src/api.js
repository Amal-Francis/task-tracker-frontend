import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios.create({
    baseURL : 'https://task-tracker-backend-rrol.onrender.com/api',
    // baseURL : "http://localhost:8000/api",
    
});

