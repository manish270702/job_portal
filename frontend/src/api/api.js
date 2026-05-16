import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API URL
  timeout: 10000,
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;