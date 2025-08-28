import axios from 'axios';
import { API_ENDPOINTS, normalizeData } from '../config/dataMapping';

// Tạo instance axios với base URL
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Có thể thêm token vào header nếu cần
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý error chung
    if (error.response) {
      // Server trả về error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Không thể kết nối server
      console.error('Network Error:', error.request);
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API functions với data normalization và try-catch
export const productAPI = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.products);
      // Normalize data trước khi trả về
      const normalizedData = response.data.map(product => normalizeData(product, 'products'));
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Lấy sản phẩm theo ID
  getById: async (id) => {
    try {
      // Xử lý ID linh hoạt - thử cả string và number
      let response;
      try {
        // Thử với ID gốc (có thể là string hoặc number)
        response = await api.get(`${API_ENDPOINTS.products}/${id}`);
      } catch (error) {
        // Nếu thất bại, thử chuyển đổi ID
        const convertedId = typeof id === 'string' ? parseInt(id, 10) : String(id);
        response = await api.get(`${API_ENDPOINTS.products}/${convertedId}`);
      }
      
      // Normalize single product
      const normalizedData = normalizeData(response.data, 'products');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  // Tìm kiếm sản phẩm
  search: async (query) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.products}?q=${query}`);
      // Normalize search results
      const normalizedData = response.data.map(product => normalizeData(product, 'products'));
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      throw error;
    }
  },

  // Cập nhật sản phẩm (PATCH)
  update: async (id, partial) => {
    try {
      // Xử lý ID linh hoạt
      let response;
      try {
        response = await api.patch(`${API_ENDPOINTS.products}/${id}`, partial);
      } catch (error) {
        const convertedId = typeof id === 'string' ? parseInt(id, 10) : String(id);
        response = await api.patch(`${API_ENDPOINTS.products}/${convertedId}`, partial);
      }
      
      const normalizedData = normalizeData(response.data, 'products');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }
};

export const accountAPI = {
  // Lấy tất cả tài khoản
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.accounts);
      // Normalize accounts data
      const normalizedData = response.data.map(account => normalizeData(account, 'accounts'));
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },
  
  // Tạo tài khoản mới
  create: async (accountData) => {
    try {
      const response = await api.post(API_ENDPOINTS.accounts, accountData);
      // Normalize created account
      const normalizedData = normalizeData(response.data, 'accounts');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },
  
  // Cập nhật tài khoản
  update: async (id, accountData) => {
    try {
      // Xử lý ID linh hoạt
      let response;
      try {
        response = await api.put(`${API_ENDPOINTS.accounts}/${id}`, accountData);
      } catch (error) {
        const convertedId = typeof id === 'string' ? parseInt(id, 10) : String(id);
        response = await api.put(`${API_ENDPOINTS.accounts}/${convertedId}`, accountData);
      }
      
      // Normalize updated account
      const normalizedData = normalizeData(response.data, 'accounts');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error updating account ${id}:`, error);
      throw error;
    }
  },
  
  // Xóa tài khoản
  delete: async (id) => {
    try {
      // Xử lý ID linh hoạt
      try {
        return await api.delete(`${API_ENDPOINTS.accounts}/${id}`);
      } catch (error) {
        const convertedId = typeof id === 'string' ? parseInt(id, 10) : String(id);
        return await api.delete(`${API_ENDPOINTS.accounts}/${convertedId}`);
      }
    } catch (error) {
      console.error(`Error deleting account ${id}:`, error);
      throw error;
    }
  },
};

export const orderAPI = {
  // Lấy tất cả đơn hàng
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.orders);
      // Normalize orders data
      const normalizedData = response.data.map(order => normalizeData(order, 'orders'));
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  // Lấy đơn hàng theo ID
  getById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.orders}/${id}`);
      // Normalize single order
      const normalizedData = normalizeData(response.data, 'orders');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },
  
  // Tạo đơn hàng mới
  create: async (orderData) => {
    try {
      const response = await api.post(API_ENDPOINTS.orders, orderData);
      // Normalize created order
      const normalizedData = normalizeData(response.data, 'orders');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  // Cập nhật đơn hàng
  update: async (id, orderData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.orders}/${id}`, orderData);
      // Normalize updated order
      const normalizedData = normalizeData(response.data, 'orders');
      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      throw error;
    }
  },
};

export default api;
