import { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axiosInstance from '../../api/axiosConfig';

const { Option } = Select;

const UserCreateModal = ({ open, onClose, onUserCreated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Xử lý tạo người dùng
    const handleCreateUser = async (values) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/admin/users', {
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role,
                gender: values.gender,
                phone: values.phone,
                address: values.address,
            });
            if (response.data.statusCode === 201) {
                message.success('Tạo người dùng thành công!');
                onUserCreated();
                onClose();
                form.resetFields();
            } else {
                message.error(response.data.message || 'Tạo người dùng thất bại.');
            }
        } catch (err) {
            console.error('Error creating user:', err);
            message.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tạo người dùng.');
        } finally {
            setLoading(false);
        }
    };

    // Reset form khi đóng Modal
    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Tạo người dùng mới"
            open={open}
            onCancel={handleClose}
            centered
            width={500}
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
                onFinish={handleCreateUser}
                disabled={loading}
            >
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                    ]}
                >
                    <Input.Password />
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
        </Modal>
    );
};

export default UserCreateModal;