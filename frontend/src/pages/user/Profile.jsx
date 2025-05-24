import { Typography, Form, Input, Button, Select, message, Divider } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
    const { token, isAuthenticated, user, setUser } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, [isAuthenticated, token]);

    const fetchUserProfile = async () => {
        if (!isAuthenticated || !user?.id) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });
            const userData = response.data.data;
            form.setFieldsValue({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                gender: userData.gender,
                address: userData.address,
            });
            setLoading(false);
        } catch (error) {
            console.log('Lỗi lấy thông tin:', error.response);
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/update-profile`,
                { id: user.id, name: values.name, gender: values.gender, phone: values.phone, address: values.address },
                { headers: token ? { Authorization: `Bearer ${token}` } : {}, withCredentials: true, timeout: 10000 }
            );
            setUser((prevUser) => ({ ...prevUser, ...response.data.data }));
            message.success('Cập nhật thông tin thành công!');
        } catch (error) {
            console.log('Lỗi cập nhật:', error.response || error.message);
            message.error('Cập nhật thông tin thất bại!');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>Đang tải...</div>;

    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                Thông tin cá nhân
            </Title>
            <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '8px' }}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label={<Text strong>Tên</Text>} name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Nhập tên của bạn" size="large" />
                    </Form.Item>
                    <Form.Item label={<Text strong>Email</Text>} name="email">
                        <Input placeholder="Nhập email của bạn" disabled size="large" />
                    </Form.Item>
                    <Form.Item label={<Text strong>Số điện thoại</Text>} name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input placeholder="Nhập số điện thoại" size="large" />
                    </Form.Item>
                    <Form.Item label={<Text strong>Giới tính</Text>} name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                        <Select placeholder="Chọn giới tính" size="large">
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                            <Option value="OTHER">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={<Text strong>Địa chỉ</Text>} name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                        <Input placeholder="Nhập địa chỉ của bạn" size="large" />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={submitting} block size="large" style={{ borderRadius: '8px' }}>
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Profile;