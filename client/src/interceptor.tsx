// src/apiClient.js

import axios from 'axios';

// Define your base URL
const baseUrl = 'http://localhost:8080/api/v1/';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    // You can modify the config object here, e.g., adding authentication headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     // Do something with the response data
//     console.log('Response:', response);
//     return response;
//   },
//   (error) => {
//     // Do something with response error
//     console.error('Response Error:', error);
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (e.g., redirect to login)
//       console.error('Unauthorized access - redirecting to login');
//       // window.location.href = '/login'; // Uncomment to redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
