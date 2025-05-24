import { useState, useEffect } from 'react';
import { Typography, Form, Input, Button, message, Card, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/axiosConfig';

const { Title } = Typography;

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mã và mật khẩu mới
    const [email, setEmail] = useState(''); // Lưu email để sử dụng ở bước 2
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

    // Xử lý gửi yêu cầu mã xác nhận
    const onRequestCode = async (values) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/forgot-password', {
                email: values.email,
            });

            if (response.data.statusCode === 200) {
                message.success(response.data.message);
                setEmail(values.email); // Lưu email để sử dụng ở bước 2
                setStep(2); // Chuyển sang bước nhập mã và mật khẩu mới
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý đặt lại mật khẩu
    const onResetPassword = async (values) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/reset-password', {
                email: email,
                code: values.code,
                newPassword: values.newPassword,
            });

            if (response.data.statusCode === 200) {
                message.success(response.data.message);
                navigate('/login'); // Chuyển về trang đăng nhập sau khi đặt lại mật khẩu thành công
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý quay lại trang trước
    const handleBack = () => {
        if (step === 1) {
            navigate('/login'); // Quay lại trang đăng nhập nếu ở bước 1
        } else {
            setStep(1); // Quay lại bước nhập email nếu ở bước 2
        }
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
                        Quên Mật Khẩu
                    </Title>

                    {step === 1 ? (
                        // Bước 1: Nhập email để yêu cầu mã xác nhận
                        <Form layout="vertical" onFinish={onRequestCode} wrapperCol={{ span: 24 }}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' },
                                ]}
                            >
                                <Input placeholder="Nhập email" size="large" />
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
                                    Gửi Mã Xác Nhận
                                </Button>
                            </Form.Item>
                            <div className="text-center text-blue-500">
                                <Link to="/login" className="hover:underline">
                                    Đã nhớ mật khẩu? Đăng nhập ngay
                                </Link>
                            </div>
                        </Form>
                    ) : (
                        // Bước 2: Nhập mã xác nhận, mật khẩu mới và xác nhận mật khẩu
                        <Form layout="vertical" onFinish={onResetPassword} wrapperCol={{ span: 24 }}>
                            <Form.Item
                                label="Mã Xác Nhận"
                                name="code"
                                rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}
                            >
                                <Input placeholder="Nhập mã xác nhận" size="large" />
                            </Form.Item>
                            <Form.Item
                                label="Mật Khẩu Mới"
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" size="large" />
                            </Form.Item>
                            <Form.Item
                                label="Xác Nhận Mật Khẩu Mới"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu mới" size="large" />
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
                                    Đặt Lại Mật Khẩu
                                </Button>
                            </Form.Item>
                            <div className="text-center text-blue-500">
                                <Link to="/login" className="hover:underline">
                                    Quay lại đăng nhập
                                </Link>
                            </div>
                        </Form>
                    )}
                </Space>
            </Card>
        </div>
    );
};

export default ForgotPassword;