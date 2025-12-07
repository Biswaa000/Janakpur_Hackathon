import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// ==================== CREATE REPORT ====================
const submitReport = async (formData) => {
  try {
    console.log('🔄 Starting report submission...');
    
    // Log FormData contents before sending
    console.log('📋 FormData contents:');
    const formDataEntries = {};
    for (let pair of formData.entries()) {
      const [key, value] = pair;
      if (value instanceof File) {
        formDataEntries[key] = `File: ${value.name} (${value.type}, ${value.size} bytes)`;
      } else {
        formDataEntries[key] = value;
      }
    }
    console.log(formDataEntries);
    
    const response = await api.post('/report', formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`📤 Upload progress: ${percentCompleted}%`);
      }
    });

    console.log('✅ Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Full error object:', error);
    
    if (error.response) {
      console.error('📡 Server responded with error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
      throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
    } else if (error.request) {
      console.error('📡 No response received. Request was:', error.request);
      throw new Error('No response from server. Please check your connection.');
    } else {
      console.error('⚠️ Request setup error:', error.message);
      throw new Error(error.message || 'Submission failed.');
    }
  }
};

// ==================== GET ALL REPORTS (with filtering & pagination) ====================
const getAllReports = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const {
      status,
      incidentType,
      urgencyLevel,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    if (incidentType) queryParams.append('incidentType', incidentType);
    if (urgencyLevel) queryParams.append('urgencyLevel', urgencyLevel);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    queryParams.append('page', page);
    queryParams.append('limit', limit);

    const response = await api.get(`/report?${queryParams.toString()}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch reports.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch reports.');
    }
  }
};

// ==================== GET SINGLE REPORT BY ID ====================
const getReportById = async (reportId) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await api.get(`/report/${reportId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Report not found.');
      } else if (error.response.status === 403) {
        throw new Error('Access denied. Report not shared with NGOs.');
      }
      throw new Error(error.response.data?.message || 'Failed to fetch report.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch report.');
    }
  }
};

// ==================== UPDATE REPORT ====================
const updateReport = async (reportId, updateData) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await api.patch(`/report/${reportId}`, updateData, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Report not found.');
      } else if (error.response.status === 403) {
        throw new Error('Access denied. Report not shared with NGOs.');
      }
      throw new Error(error.response.data?.message || 'Failed to update report.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to update report.');
    }
  }
};

// ==================== SOFT DELETE REPORT ====================
const deleteReport = async (reportId) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await api.delete(`/report/${reportId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Report not found.');
      } else if (error.response.status === 403) {
        throw new Error('Access denied. Report not shared with NGOs.');
      }
      throw new Error(error.response.data?.message || 'Failed to delete report.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to delete report.');
    }
  }
};

// ==================== RESTORE DELETED REPORT ====================
const restoreReport = async (reportId) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await api.post(`/report/${reportId}/restore`, {}, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Deleted report not found.');
      }
      throw new Error(error.response.data?.message || 'Failed to restore report.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to restore report.');
    }
  }
};

// ==================== GET DELETED REPORTS ====================
const getDeletedReports = async () => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await api.get('/report/deleted/all', {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch deleted reports.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch deleted reports.');
    }
  }
};

// ==================== GET REPORT STATISTICS ====================
const getReportStatistics = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error('Please login first.');
    }

    const { startDate, endDate } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    const response = await api.get(`/report/statistics/overview?${queryParams.toString()}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch statistics.');
    } else if (error.request) {
      throw new Error('No response from server. Check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch statistics.');
    }
  }
};

export default { 
  // Exact operations matching backend controller
  submitReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  restoreReport,
  getDeletedReports,
  getReportStatistics,
  
  // Legacy compatibility alias
  getReports: getAllReports
};