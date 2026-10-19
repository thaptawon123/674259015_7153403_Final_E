import axios from 'axios';

// Get base URL from environment or default to local backend
let rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
rawBaseUrl = rawBaseUrl.trim().replace(/\/+$/, '');

// If VITE_API_URL contains trailing /api, strip it to prevent /api/api/... duplication
if (rawBaseUrl.endsWith('/api')) {
  rawBaseUrl = rawBaseUrl.slice(0, -4);
}

const apiClient = axios.create({
  baseURL: rawBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 seconds timeout
});

export default apiClient;
