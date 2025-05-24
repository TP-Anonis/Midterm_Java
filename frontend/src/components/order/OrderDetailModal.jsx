import { useState, useEffect } from 'react';
import { Modal, Descriptions, Table, Image, Tag, Typography, message } from 'antd';
import axiosInstance from '../../api/axiosConfig';
import dayjs from 'dayjs';

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

// Hàm format tiền Việt Nam
const formatVND = (price) => {
    if (typeof price !== 'number') return '0 đ';
    return price.toLocaleString('vi-VN') + ' đ';
};

// Hàm format ngày giờ
const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};

const OrderDetailModal = ({ orderId, open, onClose }) => {
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Gọi API để lấy chi tiết đơn hàng và thông tin người dùng
    useEffect(() => {
        if (open && orderId) {
            const fetchOrderDetails = async () => {
                setLoading(true);
                try {
                    // Lấy chi tiết đơn hàng
                    const orderResponse = await axiosInstance.get(`/api/orders/${orderId}`);
                    if (orderResponse.data.statusCode === 200) {
                        const orderData = orderResponse.data.data;
                        setOrder(orderData);

                        // Lấy thông tin người dùng
                        const userResponse = await axiosInstance.get(`/api/users/${orderData.userId}`);
                        if (userResponse.data.statusCode === 200) {
                            setUser(userResponse.data.data);
                        } else {
                            message.error('Lỗi khi tải thông tin người dùng.');
                        }
                    } else {
                        message.error('Lỗi khi tải chi tiết đơn hàng.');
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
                    message.error('Đã xảy ra lỗi khi tải dữ liệu.');
                } finally {
                    setLoading(false);
                }
            };
            fetchOrderDetails();
        }
    }, [orderId, open]);

    // Định nghĩa cột cho bảng danh sách sản phẩm
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'productImage',
            key: 'productImage',
            render: (image) => (
                <Image
                    src={`${import.meta.env.VITE_UPLOADS_URL}/${image}`}
                    alt="product"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => formatVND(price),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng cộng',
            key: 'total',
            render: (_, item) => formatVND(item.price * item.quantity),
        },
    ];

    return (
        <Modal
            title={`Chi tiết đơn hàng #${orderId}`}
            open={open}
            onCancel={onClose}
            centered
            width={800}
            footer={null}
        >
            {loading ? (
                <Typography.Text>Đang tải...</Typography.Text>
            ) : (
                <>
                    {/* Thông tin đơn hàng */}
                    <Descriptions title="Thông tin đơn hàng" bordered column={1}>
                        <Descriptions.Item label="Mã đơn hàng">{order?.id}</Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt hàng">{formatDate(order?.orderDate)}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={statusColorMap[order?.status]}>{statusDisplayMap[order?.status]}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">{formatVND(order?.totalAmount)}</Descriptions.Item>
                    </Descriptions>

                    {/* Thông tin người nhận */}
                    <Descriptions title="Thông tin người nhận" bordered column={1} style={{ marginTop: 16 }}>
                        <Descriptions.Item label="Tên người nhận">{order?.receiverName}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{order?.receiverPhone}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ giao hàng">{order?.shippingAddress}</Descriptions.Item>
                    </Descriptions>

                    {/* Thông tin người đặt hàng */}
                    <Descriptions title="Thông tin người đặt hàng" bordered column={1} style={{ marginTop: 16 }}>
                        <Descriptions.Item label="Tên">{user?.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{user?.phone}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{user?.address}</Descriptions.Item>
                    </Descriptions>

                    {/* Danh sách sản phẩm */}
                    <Typography.Title level={4} style={{ marginTop: 16 }}>
                        Danh sách sản phẩm
                    </Typography.Title>
                    <Table
                        columns={columns}
                        dataSource={order?.items}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: true }}
                    />
                </>
            )}
        </Modal>
    );
};

export default OrderDetailModal;