import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API services
const apiService = {
  // Auth services
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (firstName, lastName, email, password) => 
    api.post('/users', { firstName, lastName, email, password }),
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (userData) => api.put('/users/profile', userData),

  // Internship services
  getInternships: () => api.get('/internships'),
  getInternshipById: (id) => api.get(`/internships/${id}`),
  enrollCourse: (courseId) => api.post('/users/enroll', { courseId }),
  updateCourseProgress: (progressData) => api.put('/users/progress', progressData),
  completeInternship: (courseId) => api.post('/internships/complete', { courseId }),
  seedInternships: () => api.post('/internships/seed'),

  // Interview services
  getInterviewRoles: () => api.get('/interviews/roles'),
  getInterviewQuestions: (roleId) => api.get(`/interviews/questions/${roleId}`),
  saveInterviewResults: (resultData) => api.post('/users/interview', resultData),
  seedInterviewData: () => api.post('/interviews/seed'),

  // Certificate services
  getCertificateById: (id) => api.get(`/certificates/${id}`),
  verifyCertificate: (id) => api.get(`/certificates/verify/${id}`),
  getUserCertificates: () => api.get('/certificates/user/all')
};

export default apiService;