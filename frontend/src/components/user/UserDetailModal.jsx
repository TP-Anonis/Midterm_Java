import { useState, useEffect } from 'react';
import { Modal, Descriptions, Button, Spin } from 'antd';
import axiosInstance from '../../api/axiosConfig';

const UserDetailModal = ({ visible, userId, onClose, formatGender }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Gọi API để lấy thông tin chi tiết người dùng
    const fetchUserDetails = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/api/users/${userId}`);
            if (response.data.statusCode === 200) {
                setUser(response.data.data);
            } else {
                setError('Không thể tải thông tin người dùng.');
            }
        } catch (err) {
            console.error('Error fetching user details:', err);
            setError('Đã xảy ra lỗi khi tải thông tin người dùng.');
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi userId hoặc visible thay đổi
    useEffect(() => {
        if (visible && userId) {
            fetchUserDetails();
        }
        // Reset user khi modal đóng
        if (!visible) {
            setUser(null);
            setError(null);
        }
    }, [visible, userId]);

    return (
        <Modal
            title="Chi tiết người dùng"
            visible={visible}
            onCancel={onClose}
            footer={[

                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
            {loading && <Spin tip="Đang tải..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && user && (
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Avatar">
                        <img
                            src={`${import.meta.env.VITE_UPLOADS_URL}/${user.avatar}`}
                            alt="Avatar"
                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã">{user.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="Vai trò">{user.role}</Descriptions.Item>
                    <Descriptions.Item label="Giới tính">{formatGender(user.gender)}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{user.phone}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{user.address}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {new Date(user.createdAt).toLocaleString('vi-VN')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {user.updatedAt
                            ? new Date(user.updatedAt).toLocaleString('vi-VN')
                            : 'Chưa cập nhật'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người tạo">{user.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Người cập nhật">
                        {user.updatedBy || 'Chưa có'}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
};

export default UserDetailModal;