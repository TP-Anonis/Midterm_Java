import { Typography, Form, Input, Button, message, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig.js';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const { Title } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        message.config({ top: 20, duration: 1, maxCount: 3, zIndex: 9999 });
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                username: values.email,
                password: values.password,
            });
            if (response.data.statusCode === 200) {
                const { accessToken, user } = response.data.data;
                login(user, accessToken);
                message.success('Đăng nhập thành công!', 1, () => {
                    if (user.role === 'ADMIN') navigate('/admin');
                    else navigate('/');
                });
            } else {
                message.error('Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => navigate('/');

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen flex items-center justify-center">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 p-0">
                Quay lại
            </Button>
            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                <Space direction="vertical" className="w-full">
                    <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2 text-center">
                        Đăng Nhập
                    </Title>
                    <Form layout="vertical" onFinish={onFinish} wrapperCol={{ span: 24 }}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                        >
                            <Input
                                placeholder="Nhập email"
                                size="large"
                                className="rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu"
                                size="large"
                                className="rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                className="rounded-md bg-blue-600 hover:bg-blue-700 border-none font-semibold"
                            >
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                        <div className="flex justify-between text-blue-500 text-sm">
                            <Link to="/register" className="hover:underline">
                                Đăng ký tài khoản
                            </Link>
                            <Link to="/forgot-password" className="hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </Form>
                </Space>
            </div>
        </div>
    );
};

export default Login;