import { Typography, Form, Input, Button, message, Card, Space, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig.js'; // Import axiosInstance
import { useState, useEffect } from 'react';

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Cấu hình message của Ant Design
    useEffect(() => {
        message.config({
            top: 20,
            duration: 2,
            maxCount: 3,
            zIndex: 9999,
        });
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/register', {
                name: values.name,
                phone: values.phone,
                gender: values.gender,
                email: values.email,
                password: values.password,
            });

            if (response.data.statusCode === 201) {
                message.success('Đăng ký thành công!', 2, () => {
                    navigate('/login'); // Điều hướng về trang đăng nhập sau khi đăng ký thành công
                });
            } else {
                message.error(response.data.message || 'Đăng ký thất bại!');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý quay lại trang trước
    const handleBack = () => {
        navigate('/'); // Quay lại trang trước đó
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {/* Nút Quay lại ở góc trên bên trái */}
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 p-0"
            >
                Quay lại
            </Button>

            <Card className="w-full max-w-md shadow-lg" bordered={true}>
                <Space direction="vertical" className="w-full p-8">
                    <Title level={2} className="text-center text-2xl font-bold text-gray-800">
                        Đăng Ký
                    </Title>
                    <Form layout="vertical" onFinish={onFinish} wrapperCol={{ span: 24 }}>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input placeholder="Nhập tên của bạn" size="large" />
                        </Form.Item>

                        {/* Số điện thoại và Giới tính trên cùng một dòng */}
                        <div className="flex space-x-4">
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                    {
                                        pattern: /^[0-9]{10,11}$/,
                                        message: 'Số điện thoại phải có 10-11 chữ số!',
                                    },
                                ]}
                                className="flex-1"
                            >
                                <Input placeholder="0123456789" size="large" />
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                className="flex-1"
                            >
                                <Select placeholder="Chọn giới tính" size="large">
                                    <Option value="MALE">Nam</Option>
                                    <Option value="FEMALE">Nữ</Option>
                                    <Option value="OTHER">Khác</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="example@gmail.com" size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu" size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>
                        <div className="flex justify-between text-blue-500">
                            <Link to="/login" className="hover:underline">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Register;