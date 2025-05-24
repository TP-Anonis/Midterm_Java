import { Typography, Button, Image, message, Row, Col, Spin, Divider, Space } from 'antd';
import { LeftOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
    const { id } = useParams();
    const { user, token, logout } = useAuth();
    const { updateCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                });
                const data = response.data;
                setProduct(data.data);
                setSelectedImage(data.data?.images?.[0] || null);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error.response?.data || error.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, token]);

    const handleAddToCart = async () => {
        if (!user) {
            message.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cart/add`,
                { productId: id, quantity: 1 },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            message.success('Đã thêm vào giỏ hàng!');
            updateCart();
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.response?.data || error.message);
            if (error.response?.data?.message === 'Access Denied') {
                message.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                logout();
            } else {
                message.error(`Lỗi khi thêm vào giỏ hàng: ${error.response?.data?.message || 'Lỗi server'}`);
            }
        }
    };

    const handlePrevImage = () => {
        if (product?.images?.length > 0) {
            const newIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
            setCurrentImageIndex(newIndex);
            setSelectedImage(product.images[newIndex]);
        }
    };

    const handleNextImage = () => {
        if (product?.images?.length > 0) {
            const newIndex = (currentImageIndex + 1) % product.images.length;
            setCurrentImageIndex(newIndex);
            setSelectedImage(product.images[newIndex]);
        }
    };

    const getImageUrl = (image) => (
        !image ? 'https://via.placeholder.com/150?text=No+Image' : `${import.meta.env.VITE_UPLOADS_URL}/${image}`
    );

    if (loading) return (
        <div className="text-center p-12">
            <Spin size="large" className="text-blue-600" />
            <p className="mt-4 text-gray-600 text-lg">Đang tải sản phẩm...</p>
        </div>
    );

    if (!product) return (
        <div className="text-center p-12 text-gray-600 text-lg bg-white rounded-lg">
            Không tìm thấy sản phẩm.
        </div>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
            <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2">
                {product.name}
            </Title>
            <Row gutter={[24, 24]}>
                {/* Hình ảnh chính */}
                <Col xs={24} md={14}>
                    <div className="relative">
                        <Image
                            src={getImageUrl(selectedImage)}
                            width="100%"
                            height={450}
                            alt={product.name || 'Sản phẩm'}
                            style={{
                                objectFit: 'contain',
                                borderRadius: 8,
                                padding: 16,
                                background: '#fff',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                            onError={(e) => {
                                e.target.src = getImageUrl(null);
                            }}
                        />
                        {product?.images?.length > 1 && (
                            <>
                                <Button
                                    icon={<LeftOutlined />}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold rounded-md"
                                    onClick={handlePrevImage}
                                />
                                <Button
                                    icon={<RightOutlined />}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold rounded-md"
                                    onClick={handleNextImage}
                                />
                            </>
                        )}
                    </div>
                </Col>

                {/* Thông tin sản phẩm */}
                <Col xs={24} md={10}>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <Paragraph strong className="text-blue-600 font-bold text-lg mb-2">
                            Giá: {product.price.toLocaleString()} VNĐ
                        </Paragraph>
                        <Paragraph className="text-gray-600 text-sm mb-2">
                            <strong>Thương hiệu:</strong> {product.brand || 'N/A'}
                        </Paragraph>
                        <Paragraph className="text-gray-600 text-sm mb-4">
                            <strong>Danh mục:</strong> {product.category || 'N/A'}
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleAddToCart}
                            icon={<ShoppingCartOutlined />}
                            className="rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold w-full"
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </Col>

                {/* Hình ảnh phụ (thumbnails) */}
                <Col xs={24} md={14}>
                    <div className="relative mt-4 text-center">
                        <Space direction="horizontal" size={12}>
                            {product.images && product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={getImageUrl(image)}
                                        width={80}
                                        height={80}
                                        alt={`${product.name} - Thumbnail ${index + 1}`}
                                        style={{
                                            objectFit: 'contain',
                                            cursor: 'pointer',
                                            border: selectedImage === image ? '2px solid #1890ff' : '1px solid #d9d9d9',
                                            borderRadius: 4,
                                            padding: 4,
                                            background: '#fff',
                                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                                            display: 'inline-block',
                                        }}
                                        preview={false}
                                        onClick={() => {
                                            setSelectedImage(image);
                                            setCurrentImageIndex(index);
                                        }}
                                        onError={(e) => {
                                            e.target.src = getImageUrl(null);
                                        }}
                                    />
                                ))
                            ) : (
                                <Image
                                    src={getImageUrl(null)}
                                    width={80}
                                    height={80}
                                    alt="No Image"
                                    style={{
                                        objectFit: 'contain',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: 4,
                                        display: 'inline-block',
                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                            )}
                        </Space>
                        {product?.images?.length > 1 && (
                            <>
                                <Button
                                    icon={<LeftOutlined />}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold rounded-md"
                                    onClick={handlePrevImage}
                                />
                                <Button
                                    icon={<RightOutlined />}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold rounded-md"
                                    onClick={handleNextImage}
                                />
                            </>
                        )}
                    </div>
                </Col>

                {/* Mô tả */}
                <Col xs={24}>
                    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                        <Title level={4} className="text-blue-800 mb-4 font-bold">
                            Mô tả sản phẩm
                        </Title>
                        <Divider className="my-4" />
                        {product.detailedDescription.split('\n').map((line, index) => (
                            <Paragraph
                                key={index}
                                className="text-gray-600 text-sm mb-3"
                                style={{ lineHeight: 1.8, textAlign: 'justify' }}
                            >
                                {line || 'Không có mô tả.'}
                            </Paragraph>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;