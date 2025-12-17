const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Helper function to handle API errors
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  verify: async () => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getActivity: async () => {
    const response = await fetch(`${API_URL}/dashboard/activity`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/gallery`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/gallery/${id}`);
    return handleResponse(response);
  },

  create: async (formData) => {
    const response = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      body: formData, // FormData for file upload
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Reviews API
export const reviewsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/reviews`);
    return handleResponse(response);
  },

  getAllAdmin: async () => {
    const response = await fetch(`${API_URL}/reviews/admin/all`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}`);
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  approve: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  reject: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}/reject`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};
