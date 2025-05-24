import { useState } from 'react';
import { Modal, Select, message, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig';

const { Option } = Select;

// Danh sách trạng thái đơn hàng
const orderStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

// Ánh xạ trạng thái từ tiếng Anh sang tiếng Việt
const statusDisplayMap = {
    PENDING: 'Đang chờ xử lý',
    CONFIRMED: 'Đã xác nhận',
    SHIPPED: 'Đã giao hàng',
    DELIVERED: 'Đã nhận hàng',
    CANCELLED: 'Đã hủy',
};

// Ánh xạ màu sắc cho từng trạng thái
const statusColorMap = {
    PENDING: '#faad14', // Vàng
    CONFIRMED: '#1890ff', // Xanh dương
    SHIPPED: '#722ed1', // Tím
    DELIVERED: '#52c41a', // Xanh lá
    CANCELLED: '#ff4d4f', // Đỏ
};

const UpdateOrderStatus = ({ orderId, currentStatus, onSuccess }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    // Mở modal
    const showModal = () => {
        setIsModalVisible(true);
        setSelectedStatus(currentStatus); // Reset trạng thái chọn về trạng thái hiện tại
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Xử lý cập nhật trạng thái
    const handleUpdate = async () => {
        try {
            const response = await axiosInstance.put(`/api/orders/${orderId}/status`, { status: selectedStatus });
            if (response.data.statusCode === 200) {
                message.success('Cập nhật trạng thái thành công!');
                setIsModalVisible(false);
                if (onSuccess) {
                    onSuccess(); // Gọi callback để thông báo thành công
                }
            } else {
                message.error('Lỗi khi cập nhật trạng thái.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            message.error('Lỗi khi cập nhật trạng thái.');
        }
    };

    return (
        <>
            <Button
                type="text"
                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                onClick={showModal}
            />
            <Modal
                title="Cập nhật trạng thái đơn hàng"
                open={isModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <Select
                    style={{ width: '100%' }}
                    value={selectedStatus}
                    onChange={(value) => setSelectedStatus(value)}
                >
                    {orderStatuses.map((status) => (
                        <Option key={status} value={status}>
                            <Tag color={statusColorMap[status]}>{statusDisplayMap[status]}</Tag>
                        </Option>
                    ))}
                </Select>
            </Modal>
        </>
    );
};

export default UpdateOrderStatus;