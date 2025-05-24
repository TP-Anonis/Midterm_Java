import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;

    // Nếu không có accessToken, điều hướng về trang đăng nhập
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có requiredRole, kiểm tra vai trò của người dùng
    if (requiredRole && user?.role !== requiredRole) {
        // Nếu không có quyền truy cập, điều hướng về trang chủ
        return <Navigate to="/" replace />;
    }

    // Nếu đã đăng nhập và có quyền (nếu cần), hiển thị nội dung trang
    return children;
};

export default ProtectedRoute;