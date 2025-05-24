import { Typography, Button, message, Input, Modal, Spin } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Cart = () => {
    const { user, token, isAuthenticated } = useAuth();
    const { updateCart } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [filteredCartItems, setFilteredCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [receiverName, setReceiverName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated, token]);

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCartItems([]);
            setFilteredCartItems([]);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });
            const items = response.data.data.items || [];
            const formattedItems = await Promise.all(
                items.map(async (item) => {
                    try {
                        const productResponse = await axios.get(
                            `${import.meta.env.VITE_API_URL}/api/products/${item.productId}`,
                            {
                                headers: token ? { Authorization: `Bearer ${token}` } : {},
                                withCredentials: true,
                            }
                        );
                        const productData = productResponse.data.data || {};
                        return {
                            ...item,
                            key: item.id,
                            images: productData.images || [],
                            productName: productData.name,
                            productPrice: productData.price,
                        };
                    } catch (error) {
                        console.error(`Lỗi khi lấy thông tin sản phẩm ${item.productId}:`, error);
                        return {
                            ...item,
                            key: item.id,
                            images: [],
                            productName: 'N/A',
                            productPrice: 0,
                        };
                    }
                })
            );
            setCartItems(formattedItems);
            setFilteredCartItems(formattedItems);
            setLoading(false);
            updateCart();
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            message.error('Lỗi khi lấy giỏ hàng: ' + (error.response?.data?.message || 'Lỗi server'));
            setCartItems([]);
            setFilteredCartItems([]);
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            const newQuantity = Math.max(1, parseInt(quantity) || 1);
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cart/items/${itemId}`,
                { quantity: newQuantity },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            fetchCart();
        } catch (error) {
            message.error('Lỗi khi cập nhật số lượng: ' + (error.response?.data?.message || 'Lỗi server'));
        }
    };

    const handleRemove = async (itemId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cart/items/${itemId}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            message.success('Đã xóa sản phẩm!');
            fetchCart();
        } catch (error) {
            message.error('Lỗi khi xóa sản phẩm: ' + (error.response?.data?.message || 'Lỗi server'));
        }
    };

    const handleCreateOrder = async () => {
        if (!isAuthenticated) {
            message.error('Vui lòng đăng nhập để tạo đơn hàng!');
            return;
        }
        try {
            const orderData = {
                receiverName,
                shippingAddress,
                receiverPhone,
                items: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            };
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                orderData,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            message.success('Đã tạo đơn hàng thành công!');
            setCartItems([]);
            setFilteredCartItems([]);
            setIsModalVisible(false);
            updateCart();
        } catch (error) {
            message.error('Lỗi khi tạo đơn hàng: ' + (error.response?.data?.message || 'Lỗi server'));
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value) {
            const filtered = cartItems.filter(item =>
                item.productName?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCartItems(filtered);
        } else {
            setFilteredCartItems(cartItems);
        }
    };

    const getImageUrl = (image) => (
        !image ? 'https://via.placeholder.com/150?text=No+Image' : `${import.meta.env.VITE_UPLOADS_URL}/${image}`
    );

    const calculateTotal = () => {
        return filteredCartItems.reduce((total, item) => 
            total + ((item.productPrice || 0) * (item.quantity || 0)), 0
        );
    };

    if (loading) return (
        <div className="text-center p-12">
            <Spin size="large" className="text-blue-600" />
            <p className="mt-4 text-gray-600 text-lg">Đang tải giỏ hàng...</p>
        </div>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
            <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2 text-center">
                Giỏ hàng của bạn
            </Title>
            <div className="flex flex-wrap gap-4 mb-8 items-center bg-white p-4 rounded-lg">
                <Search
                    placeholder="Tìm kiếm sản phẩm trong giỏ hàng"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    prefix={<SearchOutlined className="text-blue-500" />}
                    className="w-full md:w-64 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    size="large"
                />
            </div>
            {filteredCartItems.length === 0 ? (
                <div className="text-center p-12 text-gray-600 text-lg bg-white rounded-lg">
                    Giỏ hàng của bạn trống hoặc không tìm thấy sản phẩm.
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {filteredCartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                            >
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <img
                                        alt={item.productName || 'Sản phẩm'}
                                        src={getImageUrl(item.images?.[0])}
                                        className="w-full h-full object-contain rounded-md"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                    />
                                </div>
                                <div className="flex-1 px-4 py-2">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {item.productName || 'Không có tên'}
                                    </h3>
                                    <div className="flex items-center gap-2 my-1">
                                        <p className="text-blue-600 font-bold text-lg">
                                            {(item.productPrice || 0).toLocaleString()} VNĐ
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-600 text-sm">Số lượng:</p>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity || 1}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="w-16 p-1 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                        />
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Tổng: {((item.productPrice || 0) * (item.quantity || 0)).toLocaleString()} VNĐ
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    <Button
                                        onClick={() => handleRemove(item.id)}
                                        icon={<DeleteOutlined />}
                                        className="rounded-md bg-red-500 hover:bg-red-600 border-none text-white font-semibold"
                                        title="Xóa sản phẩm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-right mt-8">
                        <Paragraph strong className="text-blue-600 font-bold text-lg">
                            Tổng tiền giỏ hàng: {calculateTotal().toLocaleString()} VNĐ
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => setIsModalVisible(true)}
                            className="rounded-md bg-blue-600 hover:bg-blue-700 border-none font-semibold mt-2"
                        >
                            Tiến hành đặt hàng
                        </Button>
                    </div>
                </>
            )}
            <Modal
                title="Thông tin giao hàng"
                visible={isModalVisible}
                onOk={handleCreateOrder}
                onCancel={() => setIsModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Paragraph className="text-gray-800">Tên người nhận:</Paragraph>
                <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full mb-4 p-2 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
                <Paragraph className="text-gray-800">Địa chỉ giao hàng:</Paragraph>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full mb-4 p-2 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
                <Paragraph className="text-gray-800">Số điện thoại:</Paragraph>
                <input
                    type="text"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full mb-4 p-2 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
            </Modal>
        </div>
    );
};

export default Cart;