import apiClient from './api';

const RESOURCE_ENDPOINT = '/api/learning-resources';

export const learningResourceService = {
  // GET /api/learning-resources?keyword=...&category=...
  getAll: async (keyword = '', category = '') => {
    const params = {};
    if (keyword && keyword.trim().length > 0) {
      params.keyword = keyword.trim();
    }
    if (category && category.trim().length > 0) {
      params.category = category.trim();
    }
    const response = await apiClient.get(RESOURCE_ENDPOINT, { params });
    // Normalize response: res.data.data array or res.data array
    return response.data?.data || response.data || [];
  },

  // GET /api/learning-resources/:id
  getById: async (id) => {
    const response = await apiClient.get(`${RESOURCE_ENDPOINT}/${id}`);
    return response.data?.data || response.data;
  },

  // POST /api/learning-resources
  create: async (data) => {
    const response = await apiClient.post(RESOURCE_ENDPOINT, data);
    return response.data;
  },

  // PUT /api/learning-resources/:id
  update: async (id, data) => {
    const response = await apiClient.put(`${RESOURCE_ENDPOINT}/${id}`, data);
    return response.data;
  },

  // DELETE /api/learning-resources/:id
  remove: async (id) => {
    const response = await apiClient.delete(`${RESOURCE_ENDPOINT}/${id}`);
    return response.data;
  }
};

export default learningResourceService;
