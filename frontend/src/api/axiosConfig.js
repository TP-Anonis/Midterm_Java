import axios from 'axios';

// Lấy địa chỉ API từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL;

// Tạo instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: API_URL, // Đặt baseURL từ biến môi trường
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để tự động thêm token vào header Authorization
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để xử lý lỗi phản hồi (response)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Xử lý lỗi chung, ví dụ: nếu token hết hạn
        if (error.response?.status === 401) {
            // Có thể điều hướng đến trang đăng nhập hoặc làm mới token
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;