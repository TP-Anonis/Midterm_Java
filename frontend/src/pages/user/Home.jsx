import { Typography, Button, message, Space, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
    const { user, token, logout } = useAuth();
    const { updateCart } = useCart();
    const [newestProducts, setNewestProducts] = useState([]);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search`, {
                params: { page: 0, size: 20 },
            });
            const products = response.data.data.content;
            const sortedNewest = [...products].sort((a, b) => a.views - b.views).slice(0, 4);
            const sortedBestSelling = [...products].sort((a, b) => b.soldQuantity - a.soldQuantity).slice(0, 4);
            setNewestProducts(sortedNewest);
            setBestSellingProducts(sortedBestSelling);
            setLoading(false);
        } catch (error) {
            console.log('Lỗi khi lấy sản phẩm:', error.response || error.message);
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!user) {
            message.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cart/add`,
                { productId, quantity: 1 },
                { headers: token ? { Authorization: `Bearer ${token}` } : {}, withCredentials: true }
            );
            message.success('Đã thêm vào giỏ hàng!');
            updateCart();
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
            if (error.response?.data?.message === 'Access Denied') {
                message.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                logout();
            } else {
                message.error(`Lỗi khi thêm vào giỏ hàng: ${error.response?.data?.message || 'Lỗi server'}`);
            }
        }
    };

    const getImageUrl = (image) => (!image ? 'https://via.placeholder.com/150?text=No+Image' : `${import.meta.env.VITE_UPLOADS_URL}/${image}`);

    if (loading) return (
        <div className="text-center p-12">
            <Spin size="large" className="text-blue-600" />
            <p className="mt-4 text-gray-600 text-lg">Đang tải sản phẩm...</p>
        </div>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
           

            {/* Sản phẩm mới nhất */}
            <div className="mb-8">
                <Title level={3} className="text-blue-800 mb-6 font-bold text-xl border-b-2 border-blue-200 pb-2">
                    Sản phẩm mới nhất
                </Title>
                <div className="space-y-4">
                    {newestProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                        >
                            <div className="relative w-32 h-32 flex-shrink-0">
                                {product.discount && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Giảm {product.discount}%
                                    </div>
                                )}
                                <img
                                    alt={product.name || 'Sản phẩm'}
                                    src={getImageUrl(product.images?.[0])}
                                    className="w-full h-full object-contain rounded-md"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                />
                            </div>
                            <div className="flex-1 px-4 py-2">
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {product.name || 'Không có tên'}
                                </h3>
                                <div className="flex items-center gap-2 my-1">
                                    <p className="text-blue-600 font-bold text-lg">
                                        {(product.price || 0).toLocaleString()} VNĐ
                                    </p>
                                    {product.originalPrice && (
                                        <p className="text-gray-500 line-through text-sm">
                                            {(product.originalPrice || 0).toLocaleString()} VNĐ
                                        </p>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Danh mục: {product.category || 'N/A'} | Thương hiệu: {product.brand || 'N/A'}
                                </p>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                <Link to={`/products/${product.id}`}>
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        className="rounded-md bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold"
                                        title="Xem chi tiết"
                                    />
                                </Link>
                                <Button
                                    onClick={() => handleAddToCart(product.id)}
                                    icon={<ShoppingCartOutlined />}
                                    className="rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold"
                                    title="Thêm vào giỏ hàng"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sản phẩm được mua nhiều nhất */}
            <div>
                <Title level={3} className="text-blue-800 mb-6 font-bold text-xl border-b-2 border-blue-200 pb-2">
                    Sản phẩm được mua nhiều nhất
                </Title>
                <div className="space-y-4">
                    {bestSellingProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                        >
                            <div className="relative w-32 h-32 flex-shrink-0">
                                {product.discount && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Giảm {product.discount}%
                                    </div>
                                )}
                                <img
                                    alt={product.name || 'Sản phẩm'}
                                    src={getImageUrl(product.images?.[0])}
                                    className="w-full h-full object-contain rounded-md"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                />
                            </div>
                            <div className="flex-1 px-4 py-2">
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {product.name || 'Không có tên'}
                                </h3>
                                <div className="flex items-center gap-2 my-1">
                                    <p className="text-blue-600 font-bold text-lg">
                                        {(product.price || 0).toLocaleString()} VNĐ
                                    </p>
                                    {product.originalPrice && (
                                        <p className="text-gray-500 line-through text-sm">
                                            {(product.originalPrice || 0).toLocaleString()} VNĐ
                                        </p>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Danh mục: {product.category || 'N/A'} | Thương hiệu: {product.brand || 'N/A'}
                                </p>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                <Link to={`/products/${product.id}`}>
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        className="rounded-md bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold"
                                        title="Xem chi tiết"
                                    />
                                </Link>
                                <Button
                                    onClick={() => handleAddToCart(product.id)}
                                    icon={<ShoppingCartOutlined />}
                                    className="rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold"
                                    title="Thêm vào giỏ hàng"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;