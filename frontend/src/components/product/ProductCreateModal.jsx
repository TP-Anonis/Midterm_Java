import { useState } from 'react';
import { Modal, Form, Input, Select, Button, InputNumber, message, Upload, Image } from 'antd';
import { UploadOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig';

const { Option } = Select;
const { TextArea } = Input;
const categories = ['Chơi game', 'Văn phòng', 'Không dây', 'Có dây', 'Ergonomic'];
const brands = [
  'Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft',
  'HP', 'Dell', 'ASUS', 'Zowie', 'HyperX'
];


const ProductCreateModal = ({ open, onClose, onProductCreated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    // Xử lý upload hình ảnh
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await axiosInstance.post('/api/upload/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.statusCode === 201 && response.data.data.uploaded.length > 0) {
                const uploadedFileName = response.data.data.uploaded[0];
                setImageUrls((prev) => [...prev, `${import.meta.env.VITE_UPLOADS_URL}/${uploadedFileName}`]);
                return uploadedFileName;
            } else {
                message.error('Tải hình ảnh lên thất bại.');
                return false;
            }
        } catch (err) {
            console.error('Lỗi khi tải hình ảnh:', err);
            message.error('Đã xảy ra lỗi khi tải hình ảnh lên.');
            return false;
        }
    };

    // Xử lý thay đổi file trong Upload
    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // Xử lý trước khi upload
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Vui lòng chọn file ảnh!');
            return false;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Ảnh phải nhỏ hơn 5MB!');
            return false;
        }
        return true;
    };

    // Xử lý xóa hình ảnh
    const handleRemoveImage = (index) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

    // Xử lý di chuyển hình ảnh lên trên
    const moveImageUp = (index) => {
        if (index === 0) return; // Đã ở vị trí đầu tiên
        setImageUrls((prev) => {
            const newUrls = [...prev];
            [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
            return newUrls;
        });
    };

    // Xử lý di chuyển hình ảnh xuống dưới
    const moveImageDown = (index) => {
        if (index === imageUrls.length - 1) return; // Đã ở vị trí cuối cùng
        setImageUrls((prev) => {
            const newUrls = [...prev];
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
            return newUrls;
        });
    };

    // Xử lý tạo mới sản phẩm
    const handleCreateProduct = async (values) => {
        try {
            setLoading(true);
            const images = imageUrls.map((url) => url.split('/').pop());
            const response = await axiosInstance.post('/api/products', {
                name: values.name,
                price: values.price,
                brand: values.brand,
                category: values.category,
                soldQuantity: 0, // Mặc định cho sản phẩm mới
                views: 0, // Mặc định cho sản phẩm mới
                shortDescription: values.shortDescription,
                detailedDescription: values.detailedDescription,
                images: images.length > 0 ? images : [],
            });
            if (response.data.statusCode === 201) {
                message.success('Tạo sản phẩm thành công!');
                onProductCreated();
                onClose();
                form.resetFields();
                setImageUrls([]);
                setFileList([]);
            } else {
                message.error('Tạo sản phẩm thất bại.');
            }
        } catch (err) {
            console.error('Lỗi khi tạo sản phẩm:', err);
            message.error('Đã xảy ra lỗi khi tạo sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    // Reset form khi modal đóng
    const handleClose = () => {
        form.resetFields();
        setImageUrls([]);
        setFileList([]);
        onClose();
    };

    return (
        <Modal
            title="Tạo mới sản phẩm"
            open={open}
            onCancel={handleClose}
            centered
            width={600}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto', paddingBottom: 0 }}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                >
                    Tạo
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateProduct}
                disabled={loading}
            >
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="brand"
                    label="Thương hiệu"
                    rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                >
                    <Select>
                        {brands.map((brand) => (
                            <Option key={brand} value={brand}>
                                {brand}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                >
                    <Select>
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="shortDescription"
                    label="Mô tả ngắn"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="detailedDescription"
                    label="Mô tả chi tiết"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, minHeight: 120 }}>
                        {imageUrls.length > 0 ? (
                            imageUrls.map((url, index) => (
                                <div
                                    key={url}
                                    style={{
                                        position: 'relative',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: 4,
                                        padding: 4,
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <Image
                                        src={url}
                                        alt={`Hình ảnh ${index}`}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column' }}>
                                        <Button
                                            type="link"
                                            icon={<ArrowUpOutlined />}
                                            onClick={() => moveImageUp(index)}
                                            disabled={index === 0}
                                        />
                                        <Button
                                            type="link"
                                            icon={<ArrowDownOutlined />}
                                            onClick={() => moveImageDown(index)}
                                            disabled={index === imageUrls.length - 1}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                        <Button
                                            type="link"
                                            danger
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: '#888', padding: '16px' }}>
                                Chưa có hình ảnh nào được tải lên.
                            </div>
                        )}
                    </div>
                    <Upload
                        fileList={fileList}
                        customRequest={async ({ file, onSuccess, onError }) => {
                            const uploadedFileName = await handleUpload(file);
                            if (uploadedFileName) {
                                onSuccess('ok');
                            } else {
                                onError('error');
                            }
                        }}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        accept="image/*"
                        multiple
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductCreateModal;