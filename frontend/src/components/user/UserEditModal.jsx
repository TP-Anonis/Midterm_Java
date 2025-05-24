import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Spin, message, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig';

const { Option } = Select;

const UserEditModal = ({ visible, userId, onClose, onUserUpdated }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);

    // Gọi API để lấy thông tin chi tiết người dùng
    const fetchUserDetails = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/api/users/${userId}`);
            if (response.data.statusCode === 200) {
                setUser(response.data.data);
                form.setFieldsValue({
                    name: response.data.data.name,
                    role: response.data.data.role,
                    gender: response.data.data.gender,
                    phone: response.data.data.phone,
                    address: response.data.data.address,
                });
                // Hiển thị avatar hiện tại
                if (response.data.data.avatar) {
                    setAvatarUrl(`${import.meta.env.VITE_UPLOADS_URL}/${response.data.data.avatar}`);
                }
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
            setFileList([]);
            setAvatarUrl(null);
            setNewAvatar(null);
            form.resetFields();
        }
    }, [visible, userId, form]);

    // Xử lý upload file ảnh
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
                const uploadedFileName = response.data.data.uploaded[0]; // Lấy tên file đầu tiên
                setNewAvatar(uploadedFileName);
                setAvatarUrl(`${import.meta.env.VITE_UPLOADS_URL}/${uploadedFileName}`);
                message.success('Tải ảnh lên thành công!');
                return true;
            } else {
                message.error('Tải ảnh lên thất bại.');
                return false;
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            message.error('Đã xảy ra lỗi khi tải ảnh lên.');
            return false;
        }
    };

    // Xử lý thay đổi file trong Upload
    const handleChange = ({ file, fileList }) => {
        setFileList(fileList);
        if (file.status === 'done') {
            // File đã được upload thành công
            setFileList([]); // Xóa fileList sau khi upload để tránh hiển thị file đã chọn
        }
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

    // Xử lý cập nhật người dùng
    const handleUpdateUser = async (values) => {
        try {
            setLoading(true);
            const updatedAvatar = newAvatar || user?.avatar || 'avatar-default.webp';
            const response = await axiosInstance.put(`/api/admin/users`, {
                id: userId,
                name: values.name,
                role: values.role,
                gender: values.gender,
                phone: values.phone,
                address: values.address,
                avatar: updatedAvatar,
            });
            if (response.data.statusCode === 200) {
                message.success('Cập nhật người dùng thành công!');
                onUserUpdated();
                onClose();
            } else {
                message.error('Cập nhật người dùng thất bại.');
            }
        } catch (err) {
            console.error('Error updating user:', err);
            message.error('Đã xảy ra lỗi khi cập nhật người dùng.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa người dùng"
            open={visible}
            onCancel={onClose}
            centered
            width={500}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto', paddingBottom: 0 }}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                >
                    Lưu
                </Button>,
            ]}
        >
            {loading && <Spin tip="Đang tải..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateUser}
                    disabled={loading}
                >
                    <Form.Item label="Avatar">
                        {avatarUrl && (
                            <div style={{ marginBottom: 16 }}>
                                <Image
                                    src={avatarUrl}
                                    alt="Avatar"
                                    style={{ width: 100, height: 100, borderRadius: '50%' }}
                                />
                            </div>
                        )}
                        <Upload
                            fileList={fileList}
                            customRequest={({ file, onSuccess, onError }) => {
                                handleUpload(file).then((success) => {
                                    if (success) {
                                        onSuccess('ok');
                                    } else {
                                        onError('error');
                                    }
                                });
                            }}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            accept="image/*"
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                    >
                        <Select>
                            <Option value="USER">USER</Option>
                            <Option value="ADMIN">ADMIN</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                        <Select>
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                            <Option value="OTHER">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default UserEditModal;