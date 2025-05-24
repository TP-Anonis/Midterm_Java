import { Typography, message, Select, Modal, Descriptions, Tag, Button, Pagination, Spin } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const Orders = () => {
    const { token, isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
    });

    useEffect(() => {
        fetchOrders(pagination.currentPage);
    }, [isAuthenticated, token, pagination.currentPage, pagination.pageSize]);

    const fetchOrders = async (page) => {
        if (!isAuthenticated) {
            setOrders([]);
            setFilteredOrders([]);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/orders?page=${page}&size=${pagination.pageSize}&sort=orderDate,desc`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            const ordersData = response.data.data.content || [];
            const formattedOrders = ordersData.map((order) => ({
                key: order.id,
                id: order.id,
                date: order.orderDate.split('T')[0],
                total: order.totalAmount,
                status: order.status,
                items: order.items,
            }));
            setOrders(formattedOrders);
            setFilteredOrders(formattedOrders);
            setPagination({
                currentPage: response.data.data.pageable?.pageNumber || 0,
                pageSize: response.data.data.pageable?.pageSize || 10,
                totalElements: response.data.data.totalElements || 0,
                totalPages: response.data.data.totalPages || 0,
            });
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy đơn hàng:', error);
            message.error('Lỗi khi lấy danh sách đơn hàng: ' + (error.response?.data?.message || 'Lỗi server'));
            setOrders([]);
            setFilteredOrders([]);
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        setDetailLoading(true);
        try {
            const orderResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });
            if (orderResponse.data.statusCode === 200) {
                const orderData = orderResponse.data.data;
                const formattedOrderData = {
                    ...orderData,
                    items: orderData.items.map((item) => ({
                        ...item,
                        key: item.id,
                    })),
                };
                setOrderDetails(formattedOrderData);

                const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${orderData.userId}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                });
                if (userResponse.data.statusCode === 200) {
                    setUserDetails(userResponse.data.data);
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
            setDetailLoading(false);
        }
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        setPagination((prev) => ({ ...prev, currentPage: 0 }));
        if (value) {
            const filtered = orders.filter((order) => order.status === value);
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    const handlePageChange = (page, pageSize) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page - 1,
            pageSize: pageSize,
        }));
    };

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        fetchOrderDetails(orderId);
        setModalVisible(true);
    };

    const formatVND = (price) => {
        if (typeof price !== 'number') return '0 đ';
        return price.toLocaleString('vi-VN') + ' đ';
    };

    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    };

    const statusDisplayMap = {
        PENDING: 'Đang chờ xử lý',
        CONFIRMED: 'Đã xác nhận',
        SHIPPED: 'Đã giao hàng',
        DELIVERED: 'Đã nhận hàng',
        CANCELLED: 'Đã hủy',
    };

    const statusColorMap = {
        PENDING: '#faad14', // Vàng
        CONFIRMED: '#1890ff', // Xanh dương
        SHIPPED: '#722ed1', // Tím
        DELIVERED: '#52c41a', // Xanh lá
        CANCELLED: '#ff4d4f', // Đỏ
    };

    if (loading) return (
        <div className="text-center p-12">
            <Spin size="large" className="text-blue-600" />
            <p className="mt-4 text-gray-600 text-lg">Đang tải đơn hàng...</p>
        </div>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
            <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2 text-center">
                Đơn hàng của bạn
            </Title>
            <div className="flex flex-wrap gap-4 mb-8 items-center bg-white p-4 rounded-lg">
                <Select
                    placeholder="Lọc theo trạng thái"
                    value={statusFilter || undefined}
                    onChange={handleStatusFilterChange}
                    className="w-full md:w-48 rounded-md"
                    size="large"
                    allowClear
                >
                    <Option value="PENDING">Đang chờ xử lý</Option>
                    <Option value="CONFIRMED">Đã xác nhận</Option>
                    <Option value="SHIPPED">Đã giao hàng</Option>
                    <Option value="DELIVERED">Đã nhận hàng</Option>
                    <Option value="CANCELLED">Đã hủy</Option>
                </Select>
            </div>
            {filteredOrders.length === 0 ? (
                <div className="text-center p-12 text-gray-600 text-lg bg-white rounded-lg">
                    Bạn chưa có đơn hàng nào.
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                            >
                                <div className="flex-1 px-4 py-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Mã đơn hàng: <a onClick={() => handleViewDetails(order.id)} className="text-blue-600 hover:underline">{order.id}</a>
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Ngày đặt: {order.date}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Tổng tiền: <span className="text-blue-600 font-bold">{formatVND(order.total)}</span>
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Trạng thái: <Tag color={statusColorMap[order.status] || '#000'}>{statusDisplayMap[order.status] || order.status}</Tag>
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    <Button
                                        type="primary"
                                        onClick={() => handleViewDetails(order.id)}
                                        className="rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Pagination
                            current={pagination.currentPage + 1}
                            pageSize={pagination.pageSize}
                            total={pagination.totalElements}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '50']}
                            disabled={loading}
                            className="pagination-custom"
                        />
                    </div>
                </>
            )}
            <Modal
                title={<span className="text-blue-800 font-bold text-xl">Chi tiết đơn hàng #{selectedOrderId}</span>}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                centered
                width={800}
                footer={null}
            >
                {detailLoading ? (
                    <div className="text-center p-12">
                        <Spin size="large" className="text-blue-600" />
                        <p className="mt-4 text-gray-600 text-lg">Đang tải chi tiết...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <Descriptions title={<span className="text-blue-800 font-bold">Thông tin đơn hàng</span>} bordered column={1}>
                                <Descriptions.Item label="Mã đơn hàng">{orderDetails?.id}</Descriptions.Item>
                                <Descriptions.Item label="Ngày đặt hàng">{formatDate(orderDetails?.orderDate)}</Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color={statusColorMap[orderDetails?.status]}>{statusDisplayMap[orderDetails?.status]}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Tổng tiền">{formatVND(orderDetails?.totalAmount)}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <Descriptions title={<span className="text-blue-800 font-bold">Thông tin người nhận</span>} bordered column={1}>
                                <Descriptions.Item label="Tên người nhận">{orderDetails?.receiverName}</Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">{orderDetails?.receiverPhone}</Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ giao hàng">{orderDetails?.shippingAddress}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <Descriptions title={<span className="text-blue-800 font-bold">Thông tin người đặt hàng</span>} bordered column={1}>
                                <Descriptions.Item label="Tên">{userDetails?.name || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Email">{userDetails?.email || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">{userDetails?.phone || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">{userDetails?.address || 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <Typography.Title level={4} className="text-blue-800 mb-4 font-bold">
                                Danh sách sản phẩm
                            </Typography.Title>
                            <div className="space-y-4">
                                {orderDetails?.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-sm p-4"
                                    >
                                        <div className="flex-1 px-4 py-2">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.productName}
                                            </h3>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Giá: <span className="text-blue-600 font-bold">{formatVND(item.price)}</span>
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Số lượng: {item.quantity}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Tổng cộng: <span className="text-blue-600 font-bold">{formatVND(item.price * item.quantity)}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Orders;