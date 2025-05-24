import { useState, useEffect, useRef } from 'react';
import { Modal, Descriptions, Image, Typography, message, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig';

const { Title, Paragraph } = Typography;

// Hàm format tiền Việt Nam
const formatVND = (price) => {
    if (typeof price !== 'number') return '0 đ';
    return price.toLocaleString('vi-VN') + ' đ';
};

const ProductDetailModal = ({ open, productId, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const carouselRef = useRef(null);

    // Gọi API để lấy thông tin sản phẩm
    const fetchProductDetails = async () => {
        if (!productId) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/products/${productId}`);
            if (response.data.statusCode === 200) {
                const productData = response.data.data;
                setProduct(productData);
                // Hiển thị hình ảnh hiện tại
                if (productData.images && productData.images.length > 0) {
                    const urls = productData.images.map((img) => `${import.meta.env.VITE_UPLOADS_URL}/${img}`);
                    setImageUrls(urls);
                }
            } else {
                message.error('Không thể tải thông tin sản phẩm.');
            }
        } catch (err) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
            message.error('Đã xảy ra lỗi khi tải thông tin sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi productId hoặc open thay đổi
    useEffect(() => {
        if (open && productId) {
            fetchProductDetails();
        }
        // Reset khi Modal đóng
        if (!open) {
            setProduct(null);
            setImageUrls([]);
        }
    }, [open, productId]);

    // Hàm điều hướng carousel
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    return (
        <Modal
            title="Chi tiết sản phẩm"
            open={open}
            onCancel={onClose}
            centered
            width={800}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', paddingBottom: 0 }}
            footer={null}
        >
            {loading && <div>Đang tải...</div>}
            {!loading && product && (
                <div>
                    {/* Hiển thị hình ảnh dưới dạng carousel với nút điều hướng */}
                    {imageUrls.length > 0 ? (
                        <div style={{ position: 'relative', marginBottom: 16 }}>
                            <Carousel ref={carouselRef} autoplay={false}>
                                {imageUrls.map((url, index) => (
                                    <div key={url}>
                                        <Image
                                            src={url}
                                            alt={`Hình ảnh ${index}`}
                                            width="100%"
                                            height={400}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            {imageUrls.length > 1 && (
                                <>
                                    <LeftOutlined
                                        onClick={handlePrev}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 8,
                                            fontSize: 24,
                                            color: '#fff',
                                            background: 'rgba(0,0,0,0.5)',
                                            padding: 8,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                    <RightOutlined
                                        onClick={handleNext}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: 8,
                                            fontSize: 24,
                                            color: '#fff',
                                            background: 'rgba(0,0,0,0.5)',
                                            padding: 8,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    ) : (
                        <div style={{ color: '#888', padding: '16px', textAlign: 'center' }}>
                            Chưa có hình ảnh nào.
                        </div>
                    )}

                    {/* Thông tin chi tiết sản phẩm */}
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Tên sản phẩm">
                            {product.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá">
                            {formatVND(product.price)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thương hiệu">
                            {product.brand}
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh mục">
                            {product.category}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lượt xem">
                            {product.views}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng đã bán">
                            {product.soldQuantity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả ngắn">
                            {product.shortDescription}
                        </Descriptions.Item>
                    </Descriptions>

                    {/* Mô tả chi tiết */}
                    <div style={{ marginTop: 16 }}>
                        <Title level={5}>Mô tả chi tiết</Title>
                        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                            {product.detailedDescription}
                        </Paragraph>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductDetailModal;